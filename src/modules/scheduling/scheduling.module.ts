import {IAppModule} from '../../types/IAppModule';
import {ILoggerService} from '../common/service/service.types';
import {TaskScheduleService} from './model/service/TaskScheduleService';
import {EventBusService} from '../databus/services/eventBusService';
import {wait} from '../../lib/wait';
import {SchedulingModuleDataBusEvent} from './scheduling.types';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';

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
  private dataBusService: EventBusService<SchedulingEvents>;

  constructor(loggerService: ILoggerService, eventBusService: EventBusService<SchedulingEvents>) {
    this.loggerService = loggerService;
    this.dataBusService = eventBusService;
  }

  public init(config: ISchedulingModuleConfig) {
    this.config = config;

    this.loggerService.info('SchedulingModule initialized');

    this.tryStart();
    return this;
  }

  public async tryStart() {
    await wait(2000);
    await this.dataBusService.fireEvent({type: 'hello', data: {message: 'hello'}});
    await wait(2000);
    this.dataBusService.fireEvent({type: 'hello', data: {message: 'hello2'}});
  }
  public exports() {
    return {
      taskScheduleService: this.taskScheduleService!,
    };
  }
}
