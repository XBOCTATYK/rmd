import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../../../common/model/db/user.entity';

@Entity('task')
export class TaskEntity {
  constructor(
      description: string,
      userId: number,
      status: number,
      priority: number,
      dueDate: Date,
      notificationsCount: number
  ) {
    this.description = description;
    this.userId = userId;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
    this.notificationsCount = notificationsCount;
  }

  @PrimaryGeneratedColumn('increment', {name: 'task_id', type: 'bigint', primaryKeyConstraintName: 'task_id_pk'})
  public id?: number;

  @Column({name: 'task_description', type: 'varchar', length: 255})
  public description: string;

  @ManyToOne(() => UserEntity)
  @Column({name: 'user_id', type: 'bigint'})
  public userId: number;

  @Column({name: 'task_status', type: 'smallint'})
  public status: number;

  @Column({name: 'task_priority', type: 'smallint'})
  public priority: number;

  @Column({name: 'task_due_date', type: 'timestamp'})
  public dueDate: Date;

  @Column({name: 'task_notifications_count', type: 'smallint', default: 2})
  public notificationsCount: number;

  @Column({name: 'task_created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date = new Date();
}
