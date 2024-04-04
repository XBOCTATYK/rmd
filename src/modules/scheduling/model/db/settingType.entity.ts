import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'setting_type'})
export class SettingTypeEntity {
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

    @PrimaryGeneratedColumn('increment', {name: 'setting_type_id', type: 'smallint', primaryKeyConstraintName: 'setting_type_id_pk'})
      id?: number;

    @Column({name: 'setting_type_name', type: 'varchar', length: 31})
      name: string;

    @Column({name: 'setting_type_description', type: 'varchar', length: 255})
      description: string;
}
