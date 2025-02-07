import {UserSetting} from './model';

export interface IUserSettingsModuleConfig {}

export interface IUserSettingsModuleExports {
  userSettingsDataService: IUserSettingsDataService
}

export interface IUserSettingsDaoService {
  findUserSettingsByPublicUserId(publicUserId: number): Promise<UserSetting[]>
  updateUserSettings(publicUserId: number, update: Record<string, string>): Promise<void>
}

export interface IUserSettingsDataService {
  findUserSettingsByPublicUserId(publicUserId: number): Promise<UserSetting[]>
  updateUserSettings(publicUserId: number, update: Record<string, string>): Promise<void>
}
