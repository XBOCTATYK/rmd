import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {TaskExtraTypeEntity} from './taskExtraType.entity';

@Entity()
export class TaskExtraEntity {
    @PrimaryGeneratedColumn('identity', {name: 'task_extra_id', type: 'bigint', primaryKeyConstraintName: 'task_extra_id_pk'})
  public id?: number;

    @Column({name: 'task_id', type: 'bigint'})
    public taskId: number;

    @Column({name: 'task_extra_type'})
    public type: TaskExtraTypeEntity;

    @Column({name: 'task_extra_value', type: 'varchar', length: 255})
    public value: string;

    constructor(taskId: number, type: TaskExtraTypeEntity, value: string) {
      this.taskId = taskId;
      this.type = type;
      this.value = value;
    }
}