import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SettingTypeEntity} from './settingType.entity';

@Entity('user_settings')
export class UserSettingEntity {
  constructor(
      id: number,
      userId: string,
      type: string,
      value: string
  ) {
    this.id = id;
    this.publicUserId = userId;
    this.type = type;
    this.value = value;
  }

  @PrimaryGeneratedColumn(
      'increment',
      {name: 'setting_id', type: 'bigint', primaryKeyConstraintName: 'user_setting_id_pmk'}
  )
    id: number;

  @Index('user_setting_user_id_idx_k', {unique: true})
  @Column({name: 'public_user_id', type: 'varchar'})
    publicUserId: string;

  @Column({name: 'setting_type', type: 'varchar'})
  @ManyToOne(() => SettingTypeEntity, (settingType) => settingType.id)
    type: string;

  @Column({name: 'setting_value', type: 'varchar', length: 128})
    value: string;
}
