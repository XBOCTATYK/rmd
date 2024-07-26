import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {FULL_FORMAT} from '../../../lib/formats/formats';
import {IAuthUserService, INotificationsService, ITaskScheduleService} from '../../common/common.types';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationDto, Task} from '../model';

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

        const savedTask = await this.taskScheduleService?.saveTask(
            new Task(
                undefined,
                description,
                user.userId,
                0,
                priority,
                2,
                ExtendedDate.of(new Date(date + ' ' + time)).roundToMinutes().get()
            )
        );

        const nextNotificationTime = ExtendedDate.of(new Date()).addHours(2).roundToMinutes();

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
        await this.notificationService.updateNotificationAnswer(notificationId, answer);
      }
    });
  }
}
