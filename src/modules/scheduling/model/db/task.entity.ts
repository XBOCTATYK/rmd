import {Column, Entity} from 'typeorm';

@Entity('task')
export class TaskEntity {
  constructor(
      description: string,
      type: string,
      status: string,
      priority: number,
      dueDate: Date
  ) {
    this.description = description;
    this.type = type;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  @Column({name: 'task_id', type: 'bigint', primary: true})
  public id?: number;

  @Column({name: 'description', type: 'varchar', length: 255})
  public description: string;

  @Column({name: 'type', type: 'smallint'})
  public type: string;

  @Column({name: 'status', type: 'smallint'})
  public status: string;

  @Column({name: 'priority', type: 'smallint'})
  public priority: number;

  @Column({name: 'due_date', type: 'timestamp'})
  public dueDate: Date;

  @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date = new Date();
}
