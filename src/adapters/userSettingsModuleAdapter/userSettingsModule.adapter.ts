import {IDataProvider} from '../../modules/common/common.types';
import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {UserSettingsDao} from './dao/userSettingsDao';

export class UserSettingsModuleAdapter implements IUserSettingsAdapter {
  private dataProvider: IDataProvider;

  constructor(dataProvider: IDataProvider) {
    this.dataProvider = dataProvider;

    const dataSource = this.dataProvider.getDataSource();

    this.userSettingsDaoService = new UserSettingsDao(dataSource);
  }

  public userSettingsDaoService: UserSettingsDao;
}
