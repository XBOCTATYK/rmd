import {Task} from '../../../..';
import {TaskEntity} from '../db/task.entity';
import {ExtendedDate} from '../../../../lib/date-services/extended-date';

export class TaskMapper {
  public static toEntity(task: Task): TaskEntity {
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
    return new Task(
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
