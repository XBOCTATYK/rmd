import {getNextNotifyTime} from '../../../lib/calculateTime';
import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {FULL_FORMAT, TIME_FORMAT} from '../../../lib/formats/formats';
import {IAuthUserService, INotificationsService, ITaskScheduleService} from '../../common/common.types';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {ENotificationAnswerType} from '../../common/types/ENotificationAnswerType';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationDto, TaskDto} from '../model';
import {ETaskStatus} from '../model/const/ETaskStatus';

export class TaskListeners {
  private eventBusService: EventBusService<SchedulingEvents>;
  private taskScheduleService: ITaskScheduleService;
  private notificationService: INotificationsService;
  private userService: IAuthUserService;
  constructor(
      eventBusService: EventBusService<SchedulingEvents>,
      taskScheduleService: ITaskScheduleService,
      notificationService: INotificationsService,
      userService: IAuthUserService
  ) {
    this.eventBusService = eventBusService;
    this.taskScheduleService = taskScheduleService;
    this.notificationService = notificationService;
    this.userService = userService;

    Promise.all([
      this.runNewTaskListener(),
      this.runTaskListAcquiredListener(),
      this.runNotificationAnswerListener(),
    ]);
  }

  private async runNewTaskListener() {
    await this.eventBusService.addListener('scheduling', async (event) => {
      if (event.type === ESchedulingEventsType.NEW_TASK) {
        const {description, date, time, priority = 2} = event.data;
        const {publicUserId} = event.metadata ?? {};
        const user = await this.userService?.findUserByPublicId(publicUserId);

        if (!user?.userId) {
          throw new Error(`User with public id ${publicUserId} was not found!`);
        }

        const dueDate = ExtendedDate.of(new Date(date + ' ' + time)).roundToMinutes().get();
        const savedTask = await this.taskScheduleService?.saveTask(
            new TaskDto(
                undefined,
                description,
                user.userId,
                0,
                priority,
                2,
                dueDate
            )
        );

        const nextNotificationTime = ExtendedDate.of(
            getNextNotifyTime(
                {startTime: ExtendedDate.parse('09:00', TIME_FORMAT), endTime: ExtendedDate.parse('23:59', TIME_FORMAT)},
                {dueDate: dueDate, notificationsNeed: priority}
            )
        );

        await this.notificationService.saveNotification(
            new NotificationDto(
                undefined,
                nextNotificationTime.get(),
                0,
                savedTask.id!
            )
        );

        await this.eventBusService.fireEvent({
          type: ESchedulingEventsType.TASK_CREATED,
          data: {
            description: savedTask.description,
            dueDate: ExtendedDate.of(savedTask.dueDate).format(FULL_FORMAT),
            firsNotificationDate: nextNotificationTime.format(FULL_FORMAT),
          },
          metadata: {publicUserId},
        });
      }
    });
  }

  private async runTaskListAcquiredListener() {
    await this.eventBusService.addListener('scheduling', async (event) => {
      if (event.type === ESchedulingEventsType.TASK_LIST_REQUEST) {
        const publicUserId = event.metadata?.publicUserId;
        const user = await this.userService?.findUserByPublicId(publicUserId);

        if (!user?.userId) {
          throw new Error(`Task list for unknown user: ${event.metadata.publicUserId} was requested!`);
        }

        const tasks = await this.taskScheduleService?.getTasksByUser(user.userId);
        const tasksForEvent = tasks?.map((task) => {
          return {
            dueDate: ExtendedDate.of(task.dueDate).format(FULL_FORMAT),
            description: task.description,
            notificationCount: task.notificationsCount,
          };
        });
        await this.eventBusService.fireEvent({
          type: ESchedulingEventsType.TASK_LIST_ACQUIRED,
          data: {tasks: tasksForEvent},
          metadata: {publicUserId},
        });
      }
    });
  }

  private async runNotificationAnswerListener() {
    await this.eventBusService.addListener('scheduling', async (event) => {
      if (event.type === ESchedulingEventsType.NOTIFICATION_ANSWER) {
        const {notificationId, answer} = event.data;
        const {publicUserId} = event.metadata ?? {};
        await this.notificationService.updateNotificationAnswer(notificationId, answer);

        const notification = await this.notificationService.findNotification(notificationId);

        if (!notification || notification.answer > 0) {
          this.sendError({publicUserId, error: 'Notification was not found!'});

          return;
        }

        const task = await this.taskScheduleService.findTask(notification.taskId);

        if (task && task.status !== ETaskStatus.DONE) {
          if (answer === ENotificationAnswerType.FORGOT) {
            await this.taskScheduleService.updateNotificationCount(notification.taskId, task.notificationsCount + 1);
          }

          if (answer === ENotificationAnswerType.DONE) {
            await this.taskScheduleService.updateTaskStatus(notification.taskId, ETaskStatus.DONE);
          }
        } else {
          this.sendError({publicUserId, error: 'This task is already done!'});
        }
      }
    });
  }

  private sendError({publicUserId, error}: { publicUserId: string; error: string }) {
    this.eventBusService.fireEvent({
      type: ESchedulingEventsType.NOTIFICATION_ANSWER_PROCESSING_ERROR,
      data: {error},
      metadata: {publicUserId},
    });
  }
}
