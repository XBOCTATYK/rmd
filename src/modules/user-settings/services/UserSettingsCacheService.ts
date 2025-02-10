import {ILoggerService} from '../../common/service/service.types';
import {UserSetting} from '../model';
import {IUserCacheDaoService, IUserSettingsDaoService} from '../user-settings.types';

export class UserSettingsCacheService {
  constructor(
    private readonly userSettingsDao: IUserSettingsDaoService,
    private readonly userCacheDao: IUserCacheDaoService,
    private readonly loggerService: ILoggerService
  ) {}
  public async getUserSettings(userId: number): Promise<UserSetting[]> {
    return [];
  }

  public async fillCache(): Promise<void> {
    this.loggerService.info('Getting user settings for cache');
    const userSetting = await this.userSettingsDao.findUserSettingsByPublicUserId('7167082f7f886e5cb470d0793d011689');

    if (!userSetting) {
      return;
    }

    await this.userCacheDao.addUserSettings(userSetting.publicUserId, {[userSetting.type]: userSetting.value});
  }
}
