import {And, DataSource, LessThanOrEqual, MoreThan, Repository} from 'typeorm';
import {INotificationsDaoService, NotificationDto} from '../../..';
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

  async findNextNotificationForTask(taskId: number): Promise<NotificationDto | null> {
    const notificationEntity = await this.repository.findOne({where: {taskId, answer: 0}});

    if (!notificationEntity) {
      return null;
    }

    return NotificationMapper.toDto(notificationEntity);
  }

  async findNotificationsByTimestamp(timestamp: Date): Promise<NotificationDto[]> {
    const notificationList = await this.repository.find({where: {timestamp}});

    return notificationList.map((notificationEntity) => NotificationMapper.toDto(notificationEntity));
  }

  async findNotificationsSinceTimestamp(from: Date, to: Date): Promise<NotificationDto[]> {
    const notificationList = await this.repository.find({where: {timestamp: And(MoreThan(from), LessThanOrEqual(to))}});
    return notificationList.map((notificationEntity) => NotificationMapper.toDto(notificationEntity));
  }

  async saveNotification(notification: NotificationDto): Promise<void> {
    await this.repository.save(NotificationMapper.toEntity(notification));
  }

  async updateNotificationAnswer(notificationId: number, answer: number): Promise<void> {
    await this.repository.update({id: notificationId}, {answer});
  }
}
