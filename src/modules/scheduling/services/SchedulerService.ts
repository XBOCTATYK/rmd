import {getNextNotifyTime} from '../../../lib/calculateTime';
import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {FULL_FORMAT, TIME_FORMAT} from '../../../lib/formats/formats';
import {IAuthUserService, INotificationsService, ITaskScheduleService} from '../../common/common.types';
import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationDto} from '../model';

export class SchedulerService {
  private taskScheduleService: ITaskScheduleService;
  private notificationService: INotificationsService;
  private eventBusService: EventBusService<SchedulingEvents>;
  private authService: IAuthUserService;

  constructor(
      taskScheduleService: ITaskScheduleService,
      notificationService: INotificationsService,
      eventBusService: EventBusService<SchedulingEvents>,
      authService: IAuthUserService
  ) {
    this.taskScheduleService = taskScheduleService;
    this.notificationService = notificationService;
    this.eventBusService = eventBusService;
    this.authService = authService;
  }

  public start() {
    setInterval(async () => {
      const notifications = await this.notificationService.findNotificationsByTimestamp(
          ExtendedDate.of(new Date()).roundToMinutes().get()
      );

      await Promise.all(notifications.map(this.processNotification.bind(this)));
    }, 60000);
  }

  private async processNotification(notification: NotificationDto) {
    const task = await this.taskScheduleService.findTask(notification.taskId);

    if (task) {
      const nextNotificationCount = task.notificationsCount - 1;

      if (nextNotificationCount < 0) {
        await this.taskScheduleService.updateTaskStatus(task.id!, 4);
      } else {
        const nextNotificationTime = getNextNotifyTime(
            {startTime: ExtendedDate.parse('09:00', TIME_FORMAT), endTime: ExtendedDate.parse('23:00', TIME_FORMAT)},
            {dueDate: task.dueDate, notificationsNeed: nextNotificationCount}
        );
        await this.notificationService.saveNotification(
            new NotificationDto(undefined, nextNotificationTime, 0, notification.taskId)
        );
        await this.taskScheduleService.updateNotificationCount(task.id!, nextNotificationCount);
      }

      await this.eventBusService.fireEvent({
        type: 'send-notification',
        data: {
          notificationId: notification.id!,
          dueDate: ExtendedDate.of(task.dueDate).format(FULL_FORMAT),
          description: task.description,
        },
        metadata: {
          publicUserId: (await this.authService.findUserByUserId(task.userId!)).publicUserId,
        },
      });
    }
  }
}
