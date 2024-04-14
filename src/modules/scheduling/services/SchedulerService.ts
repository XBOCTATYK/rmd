import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {FULL_FORMAT} from '../../../lib/formats/formats';
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

      if (nextNotificationCount < 1) {
        await this.taskScheduleService.updateTaskStatus(task.id!, 4);
      } else {
        const nextNotificationTime = ExtendedDate.of(notification.timestamp).addHours(2).get();
        await this.notificationService.saveNotification(
            new NotificationDto(undefined, nextNotificationTime, notification.taskId, 0)
        );
        await this.taskScheduleService.updateNotificationCount(task.id!, nextNotificationCount);
      }

      await this.eventBusService.fireEvent({type: 'send-notification', data: {
        notificationId: notification.id!,
        dueDate: ExtendedDate.of(task.dueDate).format(FULL_FORMAT),
        description: task.description,
        publicUserId: (await this.authService.findUserByUserId(task.userId!)).publicUserId,
      }});
    }
  }
}
