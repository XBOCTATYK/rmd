import {ICommonModuleConfig, ICommonModuleExports, IDataProvider} from './common.types';
import {TypeOrmPostgresDataProvider} from './lib/PostgresDataProvider';
import {ILoggerService} from './service/service.types';
import {AbstractAuthModule} from './lib/AbstractAuthModule';


export class CommonModule extends AbstractAuthModule<ICommonModuleConfig, ICommonModuleExports> {
  private dataProvider?: IDataProvider;
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService) {
    super('common');
    this.loggerService = loggerService;
  }

  protected async initModule(config: ICommonModuleConfig) {
    this.loggerService.info('CommonModule initialized');

    this.dataProvider = new TypeOrmPostgresDataProvider(config.db);
    await this.dataProvider.connect();

    return this;
  }

  protected buildExports() {
    return {
      dataProvider: this.dataProvider!,
    };
  }
}
