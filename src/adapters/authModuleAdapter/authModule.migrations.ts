import {IMigrationHolder} from '../../types/IMigrationHolder';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserEntity} from './model/db/user.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';

export class AuthModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserEntity, SettingTypeEntity, UserSettingEntity],
      scripts: [],
    };
  }
}
