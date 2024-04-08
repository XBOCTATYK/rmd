import {ICommonModuleConfig, ICommonModuleExports, IDataProvider} from './common.types';
import {TypeOrmPostgresDataProvider} from './lib/PostgresDataProvider';
import {ILoggerService} from './service/service.types';
import {AbstractAuthModule} from './lib/AbstractAuthModule';
import {IMigrationHolder} from '../../types/IMigrationHolder';
import {setEntitiesToDataProvider} from '../../lib/setEntitiesToDataProvider';


export class CommonModule extends AbstractAuthModule<ICommonModuleConfig, ICommonModuleExports> {
  private dataProvider?: IDataProvider;
  private loggerService: ILoggerService;
  private migrations: IMigrationHolder[];

  constructor(loggerService: ILoggerService, migrations: IMigrationHolder[]) {
    super('common');

    this.loggerService = loggerService;
    this.migrations = migrations;
  }

  protected async initModule(config: ICommonModuleConfig) {
    this.dataProvider = new TypeOrmPostgresDataProvider(config.db);
    setEntitiesToDataProvider(this.dataProvider, this.migrations);
    await this.dataProvider.connect();

    this.loggerService.info('CommonModule initialized');

    return this;
  }

  protected buildExports() {
    return {
      dataProvider: this.dataProvider!,
    };
  }
}
