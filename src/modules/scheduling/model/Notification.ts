import {NotificationEntity} from '../../../adapters/schedulingModuleAdapter/model/db/notification.entity';

export class Notification {
  id: number | undefined;
  timestamp: Date;
  answer: number;
  taskId: number;

  constructor(id: number | undefined, timestamp: Date, answer: number, taskId: number) {
    this.id = id;
    this.timestamp = timestamp;
    this.answer = answer;
    this.taskId = taskId;
  }

  static fromEntity(entity: NotificationEntity) {
    return new Notification(
        entity.id,
        entity.timestamp,
        entity.answer,
        entity.taskId
    );
  }

  static toEntity(notification: Notification) {
    return new NotificationEntity(
        notification.id,
        notification.timestamp,
        notification.answer,
        notification.taskId
    );
  }
}
