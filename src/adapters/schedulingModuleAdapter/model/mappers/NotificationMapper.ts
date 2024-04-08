import {NotificationEntity} from '../db/notification.entity';
import {Notification} from '../../../../modules';

export class NotificationMapper {
  public static toDto(entity: NotificationEntity) {
    return new Notification(
        entity.id,
        entity.timestamp,
        entity.answer,
        entity.taskId
    );
  }

  public static toEntity(notification: Notification) {
    return new NotificationEntity(
        notification.id,
        notification.timestamp,
        notification.answer,
        notification.taskId
    );
  }
}
