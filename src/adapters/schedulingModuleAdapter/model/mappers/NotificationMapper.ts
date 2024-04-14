import {NotificationEntity} from '../db/notification.entity';
import {NotificationDto} from '../../../../modules';

export class NotificationMapper {
  public static toDto(entity: NotificationEntity) {
    return new NotificationDto(
        entity.id,
        entity.timestamp,
        entity.answer,
        entity.taskId
    );
  }

  public static toEntity(notification: NotificationDto) {
    return new NotificationEntity(
        notification.id,
        notification.timestamp,
        notification.answer,
        notification.taskId
    );
  }
}
