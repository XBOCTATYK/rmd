import {INotificationsDaoService, Notification} from '../../..';

export class NotificationsDaoService implements INotificationsDaoService {
  async deleteNotification(notificationId: number): Promise<void> {

  }

  async getNextNotificationForTask(taskId: number): Promise<Notification> {
    return new Notification(
        1,
        new Date(),
        0,
        taskId
    );
  }

  async saveNotification(notification: Notification): Promise<void> {

  }

  async updateNotificationAnswer(notificationId: number): Promise<void> {

  }
}
