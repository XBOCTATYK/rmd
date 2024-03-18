import {Column, Entity} from 'typeorm';

@Entity()
export class UserEntity {
  constructor(
      userId: number,
      tgId: number
  ) {
    this.userId = userId;
    this.tgId = tgId;
    this.createdAt = new Date();
  }

    @Column({primary: true, name: 'user_id', type: 'bigint', unique: true})
  public userId: number;

    @Column({name: 'user_tg_id', type: 'bigint', unique: true})
    public tgId: number;

    @Column({name: 'created_at', type: 'timestamp'})
    public createdAt: Date;
}
