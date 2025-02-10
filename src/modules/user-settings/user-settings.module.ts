import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {IAppModule} from '../../types/IAppModule';
import {ILoggerService} from '../common/service/service.types';
import {UserSettingsCacheService} from './services/UserSettingsCacheService';
import {UserSettingsDataService} from './services/UserSettingsDataService';
import {IUserSettingsModuleConfig, IUserSettingsModuleExports} from './user-settings.types';

export class UserSettingsModule implements IAppModule<IUserSettingsModuleConfig, IUserSettingsModuleExports> {
  private readonly userSettingsDataService;
  private userSettingsCacheDataService: UserSettingsCacheService | undefined;
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

  public async init(config: IUserSettingsModuleConfig): Promise<this> {
    this.userSettingsCacheDataService = new UserSettingsCacheService(
        this.userSettingsDataService,
        config.userSettingsCacheAdapter.userCacheDao,
        this.loggerService
    );

    await this.userSettingsCacheDataService.fillCache();
    return this;
  }
}
