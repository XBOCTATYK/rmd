import {IAppModule} from '../../types/IAppModule';
import {IMigrationHolder} from '../../types/IMigrationHolder';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';
import {ILoggerService} from '../common/service/service.types';
import {IDataProvider} from '../common/common.types';
import {TaskScheduleService} from './model/service/TaskScheduleService';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export class SchedulingModule implements IAppModule<ISchedulingModuleConfig, Record<string, any>>, IMigrationHolder {
  public name: string = 'scheduling';

  public config: ISchedulingModuleConfig = {
    scheduler: null,
  };

  private loggerService: ILoggerService;
  private dataProvider?: IDataProvider;
  private taskScheduleService?: TaskScheduleService;

  constructor(loggerService: ILoggerService, dataProvider: IDataProvider) {
    this.loggerService = loggerService;
    this.dataProvider = dataProvider;
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

  public migrations() {
    return {
      entities: [SettingTypeEntity, UserSettingEntity],
      scripts: [] as Array<(datProvider: IDataProvider) => Promise<void>>,
    };
  }
}
