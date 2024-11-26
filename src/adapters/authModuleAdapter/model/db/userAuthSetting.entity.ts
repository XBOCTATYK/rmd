import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AuthSettingTypeEntity} from './authSettingType.entity';

@Entity({name: 'user_auth_setting'})
export class UserAuthSettingEntity {
    @PrimaryGeneratedColumn(
        'increment',
        {name: 'setting_id', type: 'bigint', primaryKeyConstraintName: 'user_auth_setting_id_pk'}
    )
      id?: number;

    @Index('user_auth_setting_user_id_idx')
    @Column({name: 'user_id', type: 'bigint'})
      userId?: number;

    @Column({name: 'setting_type', type: 'varchar'})
    @ManyToOne(() => AuthSettingTypeEntity, (settingType) => settingType.id)
      settingType: AuthSettingTypeEntity;

    @Column({name: 'setting_value', type: 'varchar', length: 128})
      settingValue: string;

    constructor(
        id: number | undefined,
        userId: number | undefined,
        settingType: AuthSettingTypeEntity,
        settingValue: string
    ) {
      this.id = id;
      this.userId = userId;
      this.settingType = settingType;
      this.settingValue = settingValue;
    }
}
