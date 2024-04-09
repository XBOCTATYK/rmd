import {INotificationsDaoService} from '../scheduling.types';
import {ILoggerService} from '../../common/service/service.types';
import {INotificationsService} from '../../common/common.types';
import {Notification} from '../model';

export class NotificationService implements INotificationsService {
  private notificationDaoService: INotificationsDaoService;
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService, notificationDaoService: INotificationsDaoService) {
    this.loggerService = loggerService;
    this.notificationDaoService = notificationDaoService;
  }

  async deleteNotification(notificationId: number): Promise<void> {
    this.loggerService.info('Deleting notification: ' + notificationId);
    await this.notificationDaoService.deleteNotification(notificationId);
  }

  async findNextNotificationForTask(taskId: number): Promise<Notification> {
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

  async findNotificationsByTimestamp(timestamp: Date): Promise<Notification[]> {
    this.loggerService.info('Finding notification by timestamp: ' + timestamp);
    return await this.notificationDaoService.findNotificationsByTimestamp(timestamp);
  }

  async saveNotification(notification: Notification): Promise<void> {
    this.loggerService.info('Saving notification: ' + notification);
    await this.notificationDaoService.saveNotification(notification);
  }

  async updateNotificationAnswer(notificationId: number, answer: number): Promise<void> {
    this.loggerService.info('Updating notification answer: ' + notificationId + ' to ' + answer);
    await this.notificationDaoService.updateNotificationAnswer(notificationId, answer);
  }
}
