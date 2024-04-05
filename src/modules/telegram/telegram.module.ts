import {IAppModule} from '../../types/IAppModule';
import {ITelegramModuleConfig, ITelegramModuleExports} from './telegram.types';
import {ILoggerService} from '../common/service/service.types';
import {ITelegramApiService} from './services/service.types';
import {TelegramApiService} from './services/telegram-api.service';
import {DataBusService} from '../databus/services/databus.service';
import {DataBusEvent} from '../databus/databus.types';

export class TelegramModule implements IAppModule<ITelegramModuleConfig, ITelegramModuleExports> {
  private initialized = false;
  private config?: ITelegramModuleConfig;
  private telegramApiService?: ITelegramApiService;

  private loggerService: ILoggerService;
  private dataBusService: DataBusService;

  constructor(loggerService: ILoggerService, dataBusService: DataBusService) {
    this.loggerService = loggerService;
    this.dataBusService = dataBusService;
  }

  async init(config: ITelegramModuleConfig) {
    this.config = config;
    this.telegramApiService = new TelegramApiService(config.token);

    this.initialized = true;
    this.loggerService.info('TelegramModule initialized');
    await this.dataBusService.addListener('telegram', (event: DataBusEvent<{ message: string }>) => {
      console.log(event.data.message);
    });

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
