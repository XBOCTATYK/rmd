import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserEntity} from '../../adapters/authModuleAdapter/model/db/user.entity';
import {SettingTypeEntity} from '../../adapters/authModuleAdapter/model/db/settingType.entity';
import {UserSettingEntity} from '../../adapters/authModuleAdapter/model/db/userSetting.entity';

export class CommonModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserEntity, SettingTypeEntity, UserSettingEntity],
      scripts: [],
    };
  }
}
