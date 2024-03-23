import {IAppModule} from '../../types/IAppModule';
import {ICommonModuleConfig, ICommonModuleExports, IDataProvider} from './common.types';
import {TypeOrmPostgresDataProvider} from './lib/PostgresDataProvider';
import {PinoLoggerService} from './service/LoggerService';
import {ILoggerService} from './service/service.types';
import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserEntity} from './model/db/user.entity';


export class CommonModule implements IAppModule<ICommonModuleConfig, ICommonModuleExports>, IMigrationHolder {
  private initialized = false;
  private dataProvider?: IDataProvider;
  private loggerService: ILoggerService = new PinoLoggerService();

  constructor(loggerService: ILoggerService) {
    this.loggerService = loggerService;
  }

  public async init(config: ICommonModuleConfig) {
    this.loggerService.info('CommonModule initialized');

    this.dataProvider = new TypeOrmPostgresDataProvider(config.db);
    this.initialized = true;

    return this;
  }

  public exports() {
    if (!this.initialized) {
      throw new Error('Module not initialized yet!');
    }

    return {
      dataProvider: this.dataProvider!,
    };
  }

  public migrations() {
    return {
      entities: [UserEntity],
      scripts: [],
    };
  }
}
