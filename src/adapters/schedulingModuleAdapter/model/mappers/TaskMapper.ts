import {TaskDto} from '../../../..';
import {ExtendedDate} from '../../../../lib/date-services/extended-date';
import {TaskEntity} from '../db/task.entity';

export class TaskMapper {
  public static toEntity(task: TaskDto): TaskEntity {
    return new TaskEntity(
        task.id,
        task.description,
        task.userId,
        task.status,
        task.priority,
        ExtendedDate.of(task.dueDate).roundToMinutes().get(),
        task.notificationsCount
    );
  }

  static toDto(entity: TaskEntity) {
    return new TaskDto(
        entity.id,
        entity.description,
        entity.userId,
        entity.status,
        entity.priority,
        entity.notificationsCount,
        entity.dueDate
    );
  }
}
