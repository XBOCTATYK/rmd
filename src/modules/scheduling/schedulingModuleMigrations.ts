import {IMigrationHolder} from '../../types/IMigrationHolder';
import {SettingTypeEntity} from './model/db/settingType.entity';
import {UserSettingEntity} from './model/db/userSetting.entity';
import {IDataProvider} from '../common/common.types';

export class SchedulingModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [SettingTypeEntity, UserSettingEntity],
      scripts: [] as Array<(datProvider: IDataProvider) => Promise<void>>,
    };
  }
}
