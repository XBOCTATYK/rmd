import {DataSource, Repository} from 'typeorm';
import {ISchedulerMetaDaoService, SchedulerMetaDto} from '../../../modules';
import {SchedulerMetaEntity} from '../model/db/scheduler-meta.entity';
import {SchedulerMetaMapper} from '../model/mappers/SchedulerMetaMapper';

export class SchedulerMetaDaoService implements ISchedulerMetaDaoService {
  private dataSource: DataSource;
  private repository: Repository<SchedulerMetaEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(SchedulerMetaEntity);
  }

  public async addSchedulerMeta(schedulerMetaDto: SchedulerMetaDto): Promise<void> {
    const schedulerMetaEntity = SchedulerMetaMapper.toEntity(schedulerMetaDto);
    await this.repository.save(schedulerMetaEntity);
  }

  public async getSchedulerMetaByKey(key: string): Promise<SchedulerMetaDto | null> {
    const schedulerMetaEntity = await this.repository.findOneBy({key});

    return schedulerMetaEntity ? SchedulerMetaMapper.toDto(schedulerMetaEntity) : null;
  }
}