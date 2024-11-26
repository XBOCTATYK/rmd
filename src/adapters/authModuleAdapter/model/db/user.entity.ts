import {Column, Entity, Index, OneToMany} from 'typeorm';
import {UserAuthSettingEntity} from './userAuthSetting.entity';

@Entity('users')
export class UserEntity {
  constructor(
      userId: number | undefined,
      publicUserId: string,
      createdAt: Date = new Date(),
      settings: UserAuthSettingEntity[]
  ) {
    this.userId = userId;
    this.publicUserId = publicUserId;
    this.createdAt = createdAt;
    this.authSettings = settings;
  }

    @Column({primary: true, name: 'user_id', type: 'bigint', unique: true})
  public userId: number | undefined;

    @Index({unique: true})
    @Column({name: 'public_user_id', type: 'varchar', unique: true, length: 256, default: 'none'})
    public publicUserId: string;

    @Column({name: 'created_at', type: 'timestamp'})
    public createdAt: Date;

    @OneToMany(() => UserAuthSettingEntity, (setting) => setting.id)
    public authSettings: UserAuthSettingEntity[];
}
