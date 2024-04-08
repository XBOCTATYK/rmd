import {DataSource, Repository} from 'typeorm';
import {INotificationsDaoService, Notification} from '../../..';
import {NotificationEntity} from '../model/db/notification.entity';
import {NotificationMapper} from '../model/mappers/NotificationMapper';

export class NotificationsDaoService implements INotificationsDaoService {
  private dataSource: DataSource;
  private repository: Repository<NotificationEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(NotificationEntity);
  }
  async deleteNotification(notificationId: number): Promise<void> {
    await this.repository.delete(notificationId);
  }

  async findNextNotificationForTask(taskId: number): Promise<Notification | null> {
    const notificationEntity = await this.repository.findOne({where: {taskId, answer: 0}});

    if (!notificationEntity) {
      return null;
    }

    return NotificationMapper.toDto(notificationEntity);
  }

  async saveNotification(notification: Notification): Promise<void> {
    await this.repository.save(NotificationMapper.toEntity(notification));
  }

  async updateNotificationAnswer(notificationId: number, answer: number): Promise<void> {
    await this.repository.update({id: notificationId}, {answer});
  }
}
