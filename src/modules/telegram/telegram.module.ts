import {IAppModule} from '../../types/IAppModule';
import {ITelegramModuleConfig, ITelegramModuleExports} from './telegram.types';
import {ILoggerService} from '../common/service/service.types';
import {ITelegramApiService} from './services/service.types';
import {TelegramApiService} from './services/telegram-api.service';
import {IDataProvider} from '../common/common.types';
import {IMigrationHolder} from '../../types/IMigrationHolder';
import {UserStateEntity} from './model/db/userState.entity';

export class TelegramModule implements IAppModule<ITelegramModuleConfig, ITelegramModuleExports>, IMigrationHolder {
  private initialized = false;
  private config?: ITelegramModuleConfig;
  private telegramApiService?: ITelegramApiService;

  private loggerService: ILoggerService;
  private dataProvider?: IDataProvider;

  constructor(loggerService: ILoggerService, dataProvider: IDataProvider) {
    this.loggerService = loggerService;
    this.dataProvider = dataProvider;
  }

  async init(config: ITelegramModuleConfig) {
    this.config = config;
    this.telegramApiService = new TelegramApiService(config.token);

    this.initialized = true;
    this.loggerService.info('TelegramModule initialized');

    await this.dataProvider?.connect();
    return this;
  }

  exports() {
    if (!this.initialized) {
      throw new Error('TelegramModule was not initialized');
    }

    return {
      telegramApiService: this.telegramApiService!,
    };
  }

  migrations() {
    return {
      entities: [UserStateEntity],
      scripts: [],
    };
  }
}
