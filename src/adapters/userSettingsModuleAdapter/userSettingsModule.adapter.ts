import {RedisClientType} from 'redis';
import {DataSource} from 'typeorm';
import {IDataProvider} from '../../modules/common/common.types';
import {IUserSettingsAdapter} from '../../types/adapters/IUserSettingsAdapter';
import {UserSettingsCacheDao} from './dao/userSettingsCacheDao';
import {UserSettingsDao} from './dao/userSettingsDao';

export class UserSettingsModuleAdapter implements IUserSettingsAdapter {
  private dataProvider: IDataProvider<DataSource>;
  private cacheProvider: IDataProvider<RedisClientType>;

  constructor({dataProvider, cacheProvider}: { dataProvider: IDataProvider<DataSource>; cacheProvider: IDataProvider<RedisClientType> }) {
    this.dataProvider = dataProvider;
    this.cacheProvider = cacheProvider;

    const dataSource = this.dataProvider.getDataSource();

    this.userSettingsDaoService = new UserSettingsDao(dataSource);
    this.userSettingsCacheService = new UserSettingsCacheDao(cacheProvider);
  }

  public userSettingsDaoService: UserSettingsDao;
  public userSettingsCacheService: UserSettingsCacheDao;
}
