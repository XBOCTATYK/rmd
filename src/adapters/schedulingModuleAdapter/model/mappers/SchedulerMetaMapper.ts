import {SchedulerMetaDto} from '../../../../modules';
import {SchedulerMetaEntity} from '../db/scheduler-meta.entity';

export class SchedulerMetaMapper {
  public static toEntity(schedulingMeta: SchedulerMetaDto) {
    return new SchedulerMetaEntity(
        schedulingMeta.id,
        schedulingMeta.key,
        schedulingMeta.lastUpdate,
        schedulingMeta.isActive
    );
  }

  public static toDto(schedulerMetaEntity: SchedulerMetaEntity): SchedulerMetaDto {
    return new SchedulerMetaDto(
        schedulerMetaEntity.id,
        schedulerMetaEntity.key,
        schedulerMetaEntity.lastUpdate,
        schedulerMetaEntity.isActive
    );
  }
}
