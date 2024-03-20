import {IDataProvider, IDataSource} from '../common.types';

export class DbLikeDataService implements IDataSource {
  constructor(dataProvider: IDataProvider) {

  }
  closeSession(): void {
  }

  openSession(): void {
  }
}
