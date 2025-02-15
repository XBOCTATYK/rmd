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
    return;
  }
}
