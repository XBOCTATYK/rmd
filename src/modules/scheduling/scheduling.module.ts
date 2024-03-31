import {IAppModule} from '../../types/IAppModule';
import {ILoggerService} from '../common/service/service.types';
import {TaskScheduleService} from './model/service/TaskScheduleService';
import {DataSource} from 'typeorm';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export class SchedulingModule implements IAppModule<ISchedulingModuleConfig, Record<string, any>> {
  public name: string = 'scheduling';

  public config: ISchedulingModuleConfig = {
    scheduler: null,
  };

  private loggerService: ILoggerService;
  private dataSource?: DataSource;
  private taskScheduleService?: TaskScheduleService;

  constructor(loggerService: ILoggerService, dataSource: DataSource) {
    this.loggerService = loggerService;
    this.dataSource = dataSource;
  }

  public init(config: ISchedulingModuleConfig) {
    this.config = config;

    this.loggerService.info('SchedulingModule initialized');
    return this;
  }
  public exports() {
    return {
      taskScheduleService: this.taskScheduleService!,
    };
  }
}
