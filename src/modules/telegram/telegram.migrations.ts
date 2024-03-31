import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserStateEntity} from './model/db/userState.entity';

export class TelegramModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [UserStateEntity],
      scripts: [],
    };
  }
}
