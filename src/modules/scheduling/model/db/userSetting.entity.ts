import {Column, Entity, ManyToOne, TableForeignKey} from 'typeorm';
import {SettingTypeEntity} from './settingType.entity';

@Entity({name: 'user_setting'})
class UserSettingEntity {
  constructor(
      id: number,
      userId: number,
      settingType: SettingTypeEntity,
      settingValue: string
  ) {
    this.id = id;
    this.userId = userId;
    this.settingType = settingType;
    this.settingValue = settingValue;
  }

    @Column({primary: true, name: 'setting_id', type: 'bigint', unique: true, generated: 'increment'})
      id: number;

    @Column({name: 'user_id', type: 'bigint', unique: true})
      userId: number;

    @Column({name: 'setting_type', type: 'varchar'})
    @ManyToOne(() => SettingTypeEntity, (settingType) => settingType.id)
      settingType: SettingTypeEntity;

    @Column({name: 'setting_value', type: 'varchar', length: 128})
      settingValue: string;
}
