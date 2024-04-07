import {IMigrationHolder} from '../../types/IMigrationHolder';
import {IDataProvider} from '../common/common.types';

export class SchedulingModuleMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [],
      scripts: [] as Array<(datProvider: IDataProvider) => Promise<void>>,
    };
  }
}
