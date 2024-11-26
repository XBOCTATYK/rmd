import {IMigrationHolder} from '../../types/IMigrationHolder';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';

export class UserSettingsAdapterMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [SettingTypeEntity, UserSettingEntity],
      scripts: [],
    };
  }
}
