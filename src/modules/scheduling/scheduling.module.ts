import {IAppModule} from '../../types/IAppModule';
import {IMigrationHolder} from '../../types/IMigrationHolder';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';
import {ILoggerService} from '../common/service/service.types';
import {IDataProvider} from '../common/common.types';

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
    return {};
  }

  public migrations() {
    return {
      entities: [SettingTypeEntity, UserSettingEntity],
      scripts: [],
    };
  }
}
