import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TaskEntity} from './task.entity';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn(
        'increment',
        {name: 'notification_id', type: 'bigint', primaryKeyConstraintName: 'notification_id_pk'}
    )
      id: number | undefined;

    @Column({name: 'notification_timestamp', type: 'timestamp', nullable: false})
      timestamp: Date;

    @Column({name: 'notification_answer', type: 'smallint', nullable: false, default: 0})
      answer: number;

    @Index('notification_task_id_fk')
    @ManyToOne(() => TaskEntity, (task) => task.id, {onDelete: 'CASCADE'})
    @Column({name: 'task_id', type: 'bigint', nullable: true})
      taskId: number;

    constructor(id: number | undefined, timestamp: Date, answer: number, taskId: number) {
      this.id = id;
      this.timestamp = timestamp;
      this.answer = answer;
      this.taskId = taskId;
    }
}
