import {Column, Entity, OneToMany} from 'typeorm';
import {UserSettingEntity} from './userSetting.entity';

@Entity('users')
export class UserEntity {
  constructor(
      userId: number | undefined,
      publicUserId: number,
      createdAt: Date = new Date(),
      settings: UserSettingEntity[] = []
  ) {
    this.userId = userId;
    this.publicUserId = publicUserId;
    this.createdAt = createdAt;
    this.settings = settings;
  }

    @Column({primary: true, name: 'user_id', type: 'bigint', unique: true})
  public userId: number | undefined;

    @Column({name: 'user_tg_id', type: 'varchar', unique: true, length: 64})
    public publicUserId: number;

    @Column({name: 'created_at', type: 'timestamp'})
    public createdAt: Date;

    @OneToMany(() => UserSettingEntity, (setting) => setting.id)
    public settings: UserSettingEntity[];
}
