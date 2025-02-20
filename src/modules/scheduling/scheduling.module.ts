import {IUserSettingsDataService} from '..';
import {wait} from '../../lib/wait';
import {ISchedulingModuleAdapter} from '../../types/adapters/ISchedulingModuleAdapter';
import {IAuthUserService, ISchedulerMetaService} from '../common/common.types';
import {ESchedulingEventsType, SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ILoggerService} from '../common/service/service.types';
import {EventBusService} from '../databus/services/eventBusService';
import {ISchedulingModuleExport} from './exports.types';
import {TaskListeners} from './listeners/TaskListeners';
import {ISchedulingModuleConfig} from './scheduling.types';
import {NotificationService} from './services/NotificationService';
import {SchedulerMetaService} from './services/SchedulerMetaService';
import {SchedulerService} from './services/SchedulerService';
import {SleepTimeService} from './services/SleepTimeService';
import {TaskScheduleService} from './services/TaskScheduleService';

export class SchedulingModule extends AbstractAuthModule<ISchedulingModuleConfig, ISchedulingModuleExport> {
  private readonly taskScheduleService?: TaskScheduleService;
  private readonly notificationService: NotificationService;
  private readonly schedulerService: SchedulerService;
  private readonly schedulerMetaService: ISchedulerMetaService;
  private readonly sleepTimeService: SleepTimeService;

  constructor(
      private readonly loggerService: ILoggerService,
      private readonly eventBusService: EventBusService<SchedulingEvents>,
      private readonly schedulingModuleAdapter: ISchedulingModuleAdapter,
      private readonly authService: IAuthUserService,
      private readonly userSettingsDataService: IUserSettingsDataService
  ) {
    super('scheduling');

    this.taskScheduleService = new TaskScheduleService(
        loggerService,
        schedulingModuleAdapter.taskScheduleDaoService
    );
    this.schedulerMetaService = new SchedulerMetaService(
        'notifications_scheduler',
        loggerService,
        schedulingModuleAdapter.schedulerMetaDaoService
    );

    this.notificationService = new NotificationService(
        loggerService,
        schedulingModuleAdapter.notificationDaoService,
        this.schedulerMetaService
    );

    this.sleepTimeService = new SleepTimeService(this.userSettingsDataService);

    this.schedulerService = new SchedulerService(
        this.taskScheduleService,
        this.notificationService,
        this.eventBusService,
        this.authService,
        this.sleepTimeService
    );
  }

  public async initModule(config: ISchedulingModuleConfig) {
    this.loggerService.info('SchedulingModule initialized');

    new TaskListeners(
        this.eventBusService,
      this.taskScheduleService!,
      this.notificationService,
      this.authService,
      this.sleepTimeService
    );
    await this.schedulerService.start();

    await this.helloCheck();
    return this;
  }

  public async helloCheck() {
    await wait(2000);
    await this.eventBusService.fireEvent({type: ESchedulingEventsType.HELLO, data: {message: 'hello'}});
  }
  public buildExports() {
    return {
      taskScheduleService: this.taskScheduleService!,
    };
  }
}
