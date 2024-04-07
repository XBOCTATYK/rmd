import {TaskEntity} from '../../../adapters/schedulingModuleAdapter/model/db/task.entity';

export class Task {
  public id: number | undefined;
  public description: string;
  public userId: number;
  public status: number;
  public priority: number;
  public notificationsCount: number;
  public dueDate: Date;


  constructor(
      id: number | undefined,
      description: string,
      userId: number,
      status: number,
      priority: number,
      notificationsCount: number,
      dueDate: Date
  ) {
    this.id = id;
    this.description = description;
    this.userId = userId;
    this.status = status;
    this.priority = priority;
    this.notificationsCount = notificationsCount;
    this.dueDate = dueDate;
  }

  static fromEntity(entity: TaskEntity) {
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

  static toEntity(task: Task) {
    return new TaskEntity(
        task.id,
        task.description,
        task.userId,
        task.status,
        task.priority,
        task.dueDate,
        task.notificationsCount
    );
  }
}
