import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TaskExtraTypeEntity {
  @PrimaryGeneratedColumn(
      'increment',
      {name: 'task_extra_type', type: 'smallint', primaryKeyConstraintName: 'task_extra_type_id_pk'}
  )
  public id?: number;

  @Column({name: 'task_extra_type_name', type: 'varchar'})
  public name: string;

  @Column({name: 'task_extra_type_description', type: 'varchar'})
  public description: string;

  constructor(id: number | undefined, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
