import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {IAppModule} from '../../types/IAppModule';
import {ILoggerService} from '../common/service/service.types';
import {UserSettingsDataService} from './services/UserSettingsDataService';
import {IUserSettingsModuleConfig, IUserSettingsModuleExports} from './user-settings.types';

export class UserSettingsModule implements IAppModule<IUserSettingsModuleConfig, IUserSettingsModuleExports> {
  private readonly userSettingsDataService;
  constructor(
    private readonly userSettingsModuleAdapter: IUserSettingsAdapter,
    private readonly loggerService: ILoggerService
  ) {
    this.userSettingsDataService = new UserSettingsDataService(
        this.userSettingsModuleAdapter.userSettingsDaoService,
        this.loggerService
    );
  }

  public exports(): IUserSettingsModuleExports {
    return {
      userSettingsDataService: this.userSettingsDataService,
    };
  }

  public init(config: IUserSettingsModuleConfig): this | Promise<this> {
    return this;
  }
}
