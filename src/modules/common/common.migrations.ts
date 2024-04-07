import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserEntity} from './model/db/user.entity';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';

export class CommonModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserEntity, SettingTypeEntity, UserSettingEntity],
      scripts: [],
    };
  }
}
