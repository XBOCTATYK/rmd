import {ILoggerService} from '../../common/service/service.types';
import {UserSetting} from '../model';
import {IUserSettingsDaoService} from '../user-settings.types';

export class UserSettingsDataService {
  constructor(
    private readonly userSettingsDao: IUserSettingsDaoService,
    private readonly loggerService: ILoggerService
  ) {}

  async findUserSettingsByPublicUserId(publicUserId: string): Promise<UserSetting | null> {
    this.loggerService.debug(`findUserSettingsByPublicUserId(${publicUserId})`);
    return this.userSettingsDao.findUserSettingsByPublicUserId(publicUserId);
  }

  async updateUserSettings(publicUserId: string, update: Record<string, string>) {
    this.loggerService.debug(`updateUserSettings(${publicUserId}, ${update})`);
    return this.userSettingsDao.updateUserSettings(publicUserId, update);
  }
}
