import {IAppModule} from '../../types/IAppModule';
import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';

export class AuthModule implements IAppModule<any, any> {
  private dataProvider: IDataProvider;
  private loggerService: ILoggerService;

  constructor(dataProvider: IDataProvider, loggerService: ILoggerService) {
    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
  }
  async init(config: any) {
    this.loggerService.info('Auth module initialized');
    return this;
  }

  exports() {
    return {};
  }
}
