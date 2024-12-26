import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity('scheduler_meta')
export class SchedulerMetaEntity {
  @PrimaryGeneratedColumn(
      'increment',
      {name: 'scheduler_meta_id', type: 'bigint', primaryKeyConstraintName: 'scheduler_meta_id_pk'}
  )
  public id?: number;

  @Index('scheduler_meta_key_idx', {unique: true})
  @Column({name: 'scheduler_meta_key', type: 'varchar', length: 64, nullable: false, unique: true})
  public key: string;

  @Column({name: 'scheduler_meta_last_update', type: 'timestamp', nullable: false})
  public lastUpdate: Date;

  @Column({name: 'scheduler_meta_is_active', type: 'boolean', nullable: false, default: true})
  public isActive: boolean;

  constructor(id: number | undefined, key: string, lastUpdate: Date, isActive: boolean) {
    this.id = id;
    this.key = key;
    this.lastUpdate = lastUpdate;
    this.isActive = isActive;
  }
}
