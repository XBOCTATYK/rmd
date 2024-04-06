import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {UserAuthService} from './services/UserAuthService';

export class AuthModule extends AbstractAuthModule<any, any> {
  private dataProvider: IDataProvider;
  private loggerService: ILoggerService;
  private userAuthService?: UserAuthService;

  constructor(dataProvider: IDataProvider, loggerService: ILoggerService) {
    super('auth');

    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
  }
  protected async initModule(config: any) {
    this.loggerService.info('Auth module initialized');
    this.userAuthService = new UserAuthService(config.clientSecretHash);

    return this;
  }

  protected buildExports() {
    return {
      userAuthService: this.userAuthService!,
    };
  }
}
