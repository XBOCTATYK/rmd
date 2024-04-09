import {ILoggerService} from '../common/service/service.types';
import {TaskScheduleService} from './services/TaskScheduleService';
import {EventBusService} from '../databus/services/eventBusService';
import {wait} from '../../lib/wait';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ISchedulingModuleConfig} from './scheduling.types';
import {ISchedulingModuleExport, Task} from './exports.types';
import {ISchedulingModuleAdapter} from '../../types/adapters/ISchedulingModuleAdapter';
import {NotificationService} from './services/NotificationService';
import {Notification} from './model';
import {ExtendedDate} from '../../lib/date-services/extended-date';

export class SchedulingModule extends AbstractAuthModule<ISchedulingModuleConfig, ISchedulingModuleExport> {
  private loggerService: ILoggerService;
  private dataBusService: EventBusService<SchedulingEvents>;
  private readonly taskScheduleService?: TaskScheduleService;
  private notificationService: NotificationService;

  constructor(
      loggerService: ILoggerService,
      eventBusService: EventBusService<SchedulingEvents>,
      schedulingModuleAdapter: ISchedulingModuleAdapter
  ) {
    super('scheduling');

    this.loggerService = loggerService;
    this.dataBusService = eventBusService;
    this.taskScheduleService = new TaskScheduleService(
        loggerService,
        schedulingModuleAdapter.taskScheduleDaoService
    );
    this.notificationService = new NotificationService(
        loggerService,
        schedulingModuleAdapter.notificationDaoService
    );
  }

  public async initModule(config: ISchedulingModuleConfig) {
    this.loggerService.info('SchedulingModule initialized');

    await this.dataBusService.addListener('scheduling', async (event) => {
      if (event.type === 'new-task') {
        const {description, date, time, priority = 2} = event.data;
        const savedTask = await this.taskScheduleService?.saveTask(
            new Task(undefined, description, 1, 0, priority, 2, new Date(date + ' ' + time))
        );

        if (savedTask) {
          await this.notificationService.saveNotification(
              new Notification(
                  undefined,
                  ExtendedDate.of(new Date()).addHours(2).get(),
                  0,
                  savedTask.id!
              )
          );
        }
      }
    });

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
