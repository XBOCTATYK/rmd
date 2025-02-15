import {isEmpty} from 'lodash';
import {ILoggerService} from '../../common/service/service.types';
import {IUserCacheDaoService, IUserSettingsDaoService, IUserSettingsDataService} from '../user-settings.types';

export class UserSettingsDataService implements IUserSettingsDataService {
  constructor(
    private readonly userSettingsDao: IUserSettingsDaoService,
    private readonly userCacheDao: IUserCacheDaoService,
    private readonly loggerService: ILoggerService
  ) {}

  async findUserSettingsByPublicUserId(publicUserId: string): Promise<Record<string, string>> {
    this.loggerService.info(`findUserSettingsByPublicUserId(${publicUserId})`);
    const cached = await this.userCacheDao.findUserSettingsByPublicUserId(publicUserId);

    if (!isEmpty(cached)) {
      return cached;
    }

    const settings = (await this.userSettingsDao.findUserSettingsByPublicUserId(publicUserId))
        .reduce((acc, setting) => {
          acc[setting.type] = setting.value;
          return acc;
        }, {} as Record<string, string>);

    await this.userCacheDao.addUserSettings(publicUserId, settings);

    return settings;
  }

  async updateUserSettings(publicUserId: string, update: Record<string, string>) {
    this.loggerService.debug(`updateUserSettings(${publicUserId}, ${update})`);
    await Promise.all([
      this.userCacheDao.addUserSettings(publicUserId, update),
      this.userSettingsDao.updateUserSettings(publicUserId, update),
    ]);
  }
}
