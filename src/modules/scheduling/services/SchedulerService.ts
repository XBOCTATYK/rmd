import {getNextNotifyTime} from '../../../lib/calculateTime';
import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {FULL_FORMAT} from '../../../lib/formats/formats';
import {IAuthUserService, INotificationsService, ITaskScheduleService} from '../../common/common.types';
import {FAKE_ID} from '../../common/const/notifications';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationDto} from '../model';
import {ETaskStatus} from '../model/const/ETaskStatus';
import {IUserSleepTimeService} from './services.types';

const MINUTE = 60000;

export class SchedulerService {
  constructor(
      private readonly taskScheduleService: ITaskScheduleService,
      private readonly notificationService: INotificationsService,
      private readonly eventBusService: EventBusService<SchedulingEvents>,
      private readonly authService: IAuthUserService,
      private readonly userSleepTimeService: IUserSleepTimeService
  ) {}

  public start() {
    setInterval(async () => {
      const notifications = await this.notificationService.findWaitingNotifications();

      await Promise.all(notifications.map(this.processNotification.bind(this)));
    }, MINUTE);

    this.findOutdatedTasks();
  }

  private async processNotification(notification: NotificationDto) {
    const task = await this.taskScheduleService.findTask(notification.taskId);

    if (task) {
      if (task.dueDate < new Date() || task.status === ETaskStatus.DONE || task.notificationsCount === 0) {
        return;
      }

      const nextNotificationCount = task.notificationsCount - 1;

      const user = await this.authService.findUserByUserId(task.userId!);
      const {startTime, endTime} = await this.userSleepTimeService.getUserSleepTime(user.publicUserId);

      const nextNotificationTime = ExtendedDate.of(
          getNextNotifyTime(
              {startTime, endTime},
              {dueDate: task.dueDate, notificationsNeed: task.notificationsCount}
          )
      ).roundToMinutes();

      if (nextNotificationTime) {
        await this.notificationService.saveNotification(
            new NotificationDto(undefined, nextNotificationTime.get(), 0, notification.taskId)
        );
        await this.taskScheduleService.updateNotificationCount(task.id!, nextNotificationCount);
      }


      await this.eventBusService.fireEvent({
        type: ESchedulingEventsType.SEND_NOTIFICATION,
        data: {
          notificationId: notification.id!,
          dueDate: ExtendedDate.of(task.dueDate).format(FULL_FORMAT),
          description: task.description,
          nextNotificationDate: nextNotificationTime && nextNotificationTime.format(FULL_FORMAT),
        },
        metadata: {
          publicUserId: user.publicUserId,
        },
      });
    }
  }

  private async findOutdatedTasks() {
    const taskList = await this.taskScheduleService.getOutdatedTasks();

    await Promise.all(
        taskList.map(async (task) => {
          await this.eventBusService.fireEvent({
            type: ESchedulingEventsType.SEND_NOTIFICATION,
            data: {
              notificationId: FAKE_ID,
              dueDate: ExtendedDate.of(task.dueDate).format(FULL_FORMAT),
              description: task.description,
            },
            metadata: {
              publicUserId: (await this.authService.findUserByUserId(task.userId!)).publicUserId,
            },
          });

          await this.taskScheduleService.updateTaskStatus(task.id!, ETaskStatus.DONE);
        })
    );
  }
}
