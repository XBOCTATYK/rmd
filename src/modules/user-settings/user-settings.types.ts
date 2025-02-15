import {UserSetting} from './model';

export interface IUserSettingsModuleExports {
  userSettingsDataService: IUserSettingsDataService
}

export interface IUserSettingsDaoService {
  findUserSettingsByPublicUserId(publicUserId: string): Promise<UserSetting[]>
  updateUserSettings(publicUserId: string, update: Record<string, string>): Promise<void>
}

export interface IUserSettingsDataService {
  findUserSettingsByPublicUserId(publicUserId: string): Promise<Record<string, string>>
  updateUserSettings(publicUserId: string, update: Record<string, string>): Promise<void>
}

export interface IUserCacheDaoService {
  findUserSettingsByPublicUserId(publicUserId: string): Promise<Record<string, string>>
  addUserSettings(publicUserId: string, userSettings: Record<string, string>): Promise<void>
  bulkAddUserSettings(bulk: { publicUserId: string, userSettings: Record<string, string> }[]): Promise<void>
}

export interface IUserSettingsCacheAdapter {
  userCacheDao: IUserCacheDaoService
}

export type IUserSettingsModuleConfig = {}
