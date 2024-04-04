import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SettingTypeEntity} from './settingType.entity';

@Entity({name: 'user_setting'})
export class UserSettingEntity {
    @PrimaryGeneratedColumn('increment', {name: 'setting_id', type: 'bigint', primaryKeyConstraintName: 'user_setting_id_pk'})
      id?: number;

    @Column({name: 'user_id', type: 'bigint'})
      userId: number;

    @Column({name: 'setting_type', type: 'varchar'})
    @ManyToOne(() => SettingTypeEntity, (settingType) => settingType.id)
      settingType: SettingTypeEntity;

    @Column({name: 'setting_value', type: 'varchar', length: 128})
      settingValue: string;

    constructor(
        userId: number,
        settingType: SettingTypeEntity,
        settingValue: string
    ) {
      this.userId = userId;
      this.settingType = settingType;
      this.settingValue = settingValue;
    }
}
