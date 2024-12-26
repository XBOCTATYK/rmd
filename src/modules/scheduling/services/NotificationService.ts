import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {INotificationsService, ISchedulerMetaService} from '../../common/common.types';
import {ILoggerService} from '../../common/service/service.types';
import {NotificationDto} from '../model';
import {INotificationsDaoService} from '../scheduling.types';

export class NotificationService implements INotificationsService {
  private notificationDaoService: INotificationsDaoService;
  private schedulerMetaService: ISchedulerMetaService;
  private loggerService: ILoggerService;

  constructor(
      loggerService: ILoggerService,
      notificationDaoService: INotificationsDaoService,
      schedulerMetaService: ISchedulerMetaService
  ) {
    this.loggerService = loggerService;
    this.notificationDaoService = notificationDaoService;
    this.schedulerMetaService = schedulerMetaService;
  }

  async deleteNotification(notificationId: number): Promise<void> {
    this.loggerService.info('Deleting notification: ' + notificationId);
    await this.notificationDaoService.deleteNotification(notificationId);
  }

  async findNextNotificationForTask(taskId: number): Promise<NotificationDto> {
    this.loggerService.info('Finding next notification for task: ' + taskId);

    const notification = await this.notificationDaoService.findNextNotificationForTask(taskId);

    if (notification) {
      this.loggerService.info('Found next notification for task: ' + taskId);
    } else {
      this.loggerService.info('No next notification for task: ' + taskId);
      throw new Error('No next notification for task: ' + taskId);
    }

    return notification;
  }

  async findNotificationsByTimestamp(timestamp: Date): Promise<NotificationDto[]> {
    this.loggerService.info('Finding notification by timestamp: ' + timestamp);
    return await this.notificationDaoService.findNotificationsByTimestamp(timestamp);
  }

  async findWaitingNotifications(): Promise<NotificationDto[]> {
    this.loggerService.info('Finding waiting notifications');
    const currentMinute = ExtendedDate.of(new Date()).roundToMinutes().get();
    const lastNotificationDate = await this.schedulerMetaService.getLastUpdate();
    return await this.notificationDaoService.findNotificationsSinceTimestamp(lastNotificationDate, currentMinute);
  }

  async saveNotification(notification: NotificationDto): Promise<void> {
    this.loggerService.info('Saving notification: ' + notification);
    await this.notificationDaoService.saveNotification(notification);
  }

  async updateNotificationAnswer(notificationId: number, answer: number): Promise<void> {
    this.loggerService.info('Updating notification answer: ' + notificationId + ' to ' + answer);
    await this.notificationDaoService.updateNotificationAnswer(notificationId, answer);
  }
}
