import {Column, Entity} from 'typeorm';

@Entity()
export class TaskExtraTypeEntity {
  @Column({name: 'task_extra_type', type: 'smallint'})
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
