import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {IAppModule} from '../../types/IAppModule';
import {IUserSettingsModuleConfig, IUserSettingsModuleExports} from './user-settings.types';

export class UserSettingsModule implements IAppModule<IUserSettingsModuleConfig, IUserSettingsModuleExports> {
  private userSettingsModuleAdapter: IUserSettingsAdapter;
  constructor(userSettingsModuleAdapter: IUserSettingsAdapter) {
    this.userSettingsModuleAdapter = userSettingsModuleAdapter;
  }

  public exports(): IUserSettingsModuleExports {
    return {};
  }

  public init(config: IUserSettingsModuleConfig): this | Promise<this> {
    return this;
  }
}
