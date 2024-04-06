import {ILoggerService} from '../common/service/service.types';
import {TaskScheduleService} from './services/TaskScheduleService';
import {EventBusService} from '../databus/services/eventBusService';
import {wait} from '../../lib/wait';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ISchedulingModuleConfig} from './scheduling.types';

export class SchedulingModule extends AbstractAuthModule<ISchedulingModuleConfig, Record<string, any>> {
  private loggerService: ILoggerService;
  private taskScheduleService?: TaskScheduleService;
  private dataBusService: EventBusService<SchedulingEvents>;

  constructor(loggerService: ILoggerService, eventBusService: EventBusService<SchedulingEvents>) {
    super('scheduling');
    this.loggerService = loggerService;
    this.dataBusService = eventBusService;
  }

  public async initModule(config: ISchedulingModuleConfig) {
    this.loggerService.info('SchedulingModule initialized');

    await this.tryStart();
    return this;
  }

  public async tryStart() {
    await wait(2000);
    await this.dataBusService.fireEvent({type: 'hello', data: {message: 'hello'}});
    await wait(2000);
    await this.dataBusService.fireEvent({type: 'hello', data: {message: 'hello2'}});
  }
  public buildExports() {
    return {
      taskScheduleService: this.taskScheduleService!,
    };
  }
}
