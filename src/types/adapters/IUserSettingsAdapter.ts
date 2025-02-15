import {IUserCacheDaoService, IUserSettingsDaoService} from '../../modules';

export interface IUserSettingsAdapter {
  userSettingsDaoService: IUserSettingsDaoService
  userSettingsCacheService: IUserCacheDaoService
}
