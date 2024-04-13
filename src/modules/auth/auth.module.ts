import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {UserAuthService} from './services/UserAuthService';
import {IAuthModuleConfig, IAuthModuleExports} from './auth.types';
import {IAuthModuleAdapter} from '../../types/adapters/IAuthModuleAdapter';

export class AuthModule extends AbstractAuthModule<IAuthModuleConfig, IAuthModuleExports> {
  private dataProvider: IDataProvider;
  private loggerService: ILoggerService;
  private userAuthService?: UserAuthService;
  private dataAdapter: IAuthModuleAdapter;

  constructor(
      dataProvider: IDataProvider,
      loggerService: ILoggerService,
      dataAdapter: IAuthModuleAdapter
  ) {
    super('auth');

    this.dataProvider = dataProvider;
    this.loggerService = loggerService;

    this.dataAdapter = dataAdapter;
  }
  protected async initModule(config: any) {
    this.loggerService.info('Auth module initialized');
    this.userAuthService = new UserAuthService(this.dataAdapter.userAuthDao, config.clientSecretHash, config.allowedUsers);

    return this;
  }

  protected buildExports() {
    return {
      userAuthService: this.userAuthService!,
    };
  }
}
