import {IAuthModuleAdapter} from '../../types/adapters/IAuthModuleAdapter';
import {IDataProvider} from '../common/common.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ILoggerService} from '../common/service/service.types';
import {IAuthModuleConfig, IAuthModuleExports} from './auth.types';
import {UserAuthService} from './services/UserAuthService';

export class AuthModule extends AbstractAuthModule<IAuthModuleConfig, IAuthModuleExports> {
  private userAuthService?: UserAuthService;

  constructor(
      private readonly dataProvider: IDataProvider,
      private readonly loggerService: ILoggerService,
      private readonly dataAdapter: IAuthModuleAdapter
  ) {
    super('auth');
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
