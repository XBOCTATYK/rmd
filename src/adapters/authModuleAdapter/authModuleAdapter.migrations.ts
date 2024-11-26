import {IMigrationHolder} from '../../types/IMigrationHolder';
import {AuthSettingTypeEntity} from './model/db/authSettingType.entity';
import {UserEntity} from './model/db/user.entity';
import {UserAuthSettingEntity} from './model/db/userAuthSetting.entity';

export class AuthModuleAdapterMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserEntity, AuthSettingTypeEntity, UserAuthSettingEntity],
      scripts: [],
    };
  }
}
