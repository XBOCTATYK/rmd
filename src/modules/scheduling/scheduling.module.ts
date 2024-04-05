import {IAppModule} from '../../types/IAppModule';
import {ILoggerService} from '../common/service/service.types';
import {TaskScheduleService} from './model/service/TaskScheduleService';
import {DataBusService} from '../databus/services/databus.service';
import {wait} from '../../lib/delay';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export class SchedulingModule implements IAppModule<ISchedulingModuleConfig, Record<string, any>> {
  public name: string = 'scheduling';

  public config: ISchedulingModuleConfig = {
    scheduler: null,
  };

  private loggerService: ILoggerService;
  private taskScheduleService?: TaskScheduleService;
  private dataBusService: DataBusService;

  constructor(loggerService: ILoggerService, dataBusService: DataBusService) {
    this.loggerService = loggerService;
    this.dataBusService = dataBusService;
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
