import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ILoggerService} from '../common/service/service.types';
import {UserSettingsCacheService} from './services/UserSettingsCacheService';
import {UserSettingsDataService} from './services/UserSettingsDataService';
import {IUserSettingsModuleConfig, IUserSettingsModuleExports} from './user-settings.types';

export class UserSettingsModule extends AbstractAuthModule<IUserSettingsModuleConfig, IUserSettingsModuleExports> {
  private userSettingsDataService: UserSettingsDataService | undefined;
  private userSettingsCacheDataService: UserSettingsCacheService | undefined;
  constructor(
    private readonly userSettingsModuleAdapter: IUserSettingsAdapter,
    private readonly loggerService: ILoggerService
  ) {
    super('user-settings');
  }

  protected buildExports(): IUserSettingsModuleExports {
    return {
      userSettingsDataService: this.userSettingsDataService!,
    };
  }

  protected async initModule(config?: IUserSettingsModuleConfig): Promise<this> {
    this.userSettingsDataService = new UserSettingsDataService(
        this.userSettingsModuleAdapter.userSettingsDaoService,
        this.userSettingsModuleAdapter.userSettingsCacheService,
        this.loggerService
    );

    this.userSettingsCacheDataService = new UserSettingsCacheService(
        this.userSettingsModuleAdapter.userSettingsDaoService,
        this.userSettingsModuleAdapter.userSettingsCacheService,
        this.loggerService
    );


    await this.userSettingsCacheDataService.fillCache();
    return this;
  }
}
