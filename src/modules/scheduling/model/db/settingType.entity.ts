import {Column, Entity} from 'typeorm';

@Entity({name: 'setting_type'})
export class SettingTypeEntity {
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

    @Column({name: 'setting_type_id', type: 'smallint', primary: true, unique: true})
      id: number;

    @Column({name: 'setting_type_name', type: 'varchar', length: 31})
      name: string;

    @Column({name: 'setting_type_description', type: 'varchar', length: 255})
      description: string;
}
