import {IAppModule} from '../../types/IAppModule';
import {ITelegramModuleConfig, ITelegramModuleExports} from './telegram.types';
import {ILoggerService} from '../common/service/service.types';
import {ITelegramApiService} from './services/service.types';
import {TelegramApiService} from './services/telegram-api.service';
import {DataSource} from 'typeorm';

export class TelegramModule implements IAppModule<ITelegramModuleConfig, ITelegramModuleExports> {
  private initialized = false;
  private config?: ITelegramModuleConfig;
  private telegramApiService?: ITelegramApiService;

  private loggerService: ILoggerService;
  private dataSource?: DataSource;

  constructor(loggerService: ILoggerService, dataSource: DataSource) {
    this.loggerService = loggerService;
    this.dataSource = dataSource;
  }

  async init(config: ITelegramModuleConfig) {
    this.config = config;
    this.telegramApiService = new TelegramApiService(config.token);

    this.initialized = true;
    this.loggerService.info('TelegramModule initialized');

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
}
