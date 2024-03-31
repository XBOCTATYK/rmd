import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserEntity} from './model/db/user.entity';

export class CommonModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserEntity],
      scripts: [],
    };
  }
}
