import {ExtendedDate} from '../../../lib/date-services/extended-date';
import {TIME_FORMAT} from '../../../lib/formats/formats';
import {IUserSettingsDataService} from '../../user-settings';
import {DEFAULT_TIME_USER_SETTING} from '../const/time';
import {IUserSleepTimeService} from './services.types';

export class SleepTimeService implements IUserSleepTimeService {
  constructor(private readonly userSettingsDataService: IUserSettingsDataService) {}
  async getUserSleepTime(publicUserId: string) {
    const userSettings = await this.userSettingsDataService.findUserSettingsByPublicUserId(publicUserId);
    const [startTime, endTime] = (userSettings['sleepTime'] ?? DEFAULT_TIME_USER_SETTING).split(',');

    return {
      startTime: ExtendedDate.parse(startTime, TIME_FORMAT),
      endTime: ExtendedDate.parse(endTime, TIME_FORMAT),
    };
  }
}
