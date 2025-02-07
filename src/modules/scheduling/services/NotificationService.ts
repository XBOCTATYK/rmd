import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {INotificationsService, ISchedulerMetaService} from '../../common/common.types';
import {ILoggerService} from '../../common/service/service.types';
import {NotificationDto} from '../model';
import {INotificationsDaoService} from '../scheduling.types';

export class NotificationService implements INotificationsService {
  constructor(
      private readonly loggerService: ILoggerService,
      private readonly notificationDaoService: INotificationsDaoService,
      private readonly schedulerMetaService: ISchedulerMetaService
  ) {}

  async deleteNotification(notificationId: number): Promise<void> {
    this.loggerService.info('Deleting notification: ' + notificationId);
    await this.notificationDaoService.deleteNotification(notificationId);
  }

  async findNotification(notificationId: number): Promise<NotificationDto | null> {
    this.loggerService.info('Finding notification: ' + notificationId);
    return await this.notificationDaoService.findNotification(notificationId);
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
    const result = await this.notificationDaoService.findNotificationsSinceTimestamp(lastNotificationDate, currentMinute);
    this.schedulerMetaService.updateLastUpdate(currentMinute);

    return result;
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
