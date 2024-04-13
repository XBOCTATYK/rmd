import {IAuthModuleAdapter} from '../../types/adapters/IAuthModuleAdapter';
import {UserAuthDao} from './dao/UserAuthDao';
import {IDataProvider} from '../../modules/common/common.types';
import {DataSource} from 'typeorm';

export class AuthModuleAdapter implements IAuthModuleAdapter {
  public userAuthDao: UserAuthDao;

  private readonly dataSource: DataSource;

  constructor(dataProvider: IDataProvider) {
    this.dataSource = dataProvider.getDataSource();
    this.userAuthDao = new UserAuthDao(this.dataSource);
  }
}
