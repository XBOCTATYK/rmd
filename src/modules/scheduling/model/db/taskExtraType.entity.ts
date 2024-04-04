import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TaskExtraTypeEntity {
  @PrimaryGeneratedColumn('increment', {name: 'task_extra_type', type: 'smallint', primaryKeyConstraintName: 'task_extra_type_id_pk'})
  public id?: number;

  @Column({name: 'task_extra_type_name', type: 'varchar'})
  public name: string;

  @Column({name: 'task_extra_type_description', type: 'varchar'})
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
