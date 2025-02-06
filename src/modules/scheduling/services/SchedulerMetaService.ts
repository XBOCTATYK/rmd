import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {ISchedulerMetaService} from '../../common/common.types';
import {ILoggerService} from '../../common/service/service.types';
import {SchedulerMetaDto} from '../model';
import {ISchedulerMetaDaoService} from '../scheduling.types';

export class SchedulerMetaService implements ISchedulerMetaService {
  private readonly key: string;
  private loggerService: ILoggerService;
  private schedulerMetaDaoService: ISchedulerMetaDaoService;

  constructor(key: string, loggerService: ILoggerService, schedulerMetaDaoService: ISchedulerMetaDaoService) {
    this.schedulerMetaDaoService = schedulerMetaDaoService;
    this.key = key;
    this.loggerService = loggerService;
  }
  async getLastUpdate(): Promise<Date> {
    this.loggerService.info(`Getting last update of: ${this.key}`);
    const result = await this.schedulerMetaDaoService.getSchedulerMetaByKey(this.key);

    if (!result) {
      const firstUpdateDate = ExtendedDate.of(new Date()).roundToMinutes().get();
      await this.schedulerMetaDaoService.addSchedulerMeta(
          new SchedulerMetaDto(
              undefined,
              this.key,
              firstUpdateDate,
              true
          )
      );

      return firstUpdateDate;
    }

    return result.lastUpdate;
  }

  async updateLastUpdate(updateDate: Date): Promise<void> {
    this.loggerService.info(`Updating last update of: ${this.key}`);
    await this.schedulerMetaDaoService.updateSchedulerMeta(this.key, updateDate);
  }
}
