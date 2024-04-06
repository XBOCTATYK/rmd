import {ITelegramModuleConfig, ITelegramModuleExports} from './telegram.types';
import {ILoggerService} from '../common/service/service.types';
import {ITelegramApiService} from './services/service.types';
import {TelegramApiService} from './services/telegram-api.service';
import {EventBusService} from '../databus/services/eventBusService';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';

export class TelegramModule extends AbstractAuthModule<ITelegramModuleConfig, ITelegramModuleExports> {
  private telegramApiService?: ITelegramApiService;
  private loggerService: ILoggerService;
  private dataBusService: EventBusService<SchedulingEvents>;

  constructor(loggerService: ILoggerService, dataBusService: EventBusService<SchedulingEvents>) {
    super('telegram');
    this.loggerService = loggerService;
    this.dataBusService = dataBusService;
  }

  protected async initModule(config: ITelegramModuleConfig) {
    this.telegramApiService = new TelegramApiService(config.token);

    this.loggerService.info('TelegramModule initialized');
    await this.dataBusService.addListener('telegram', (event) => {
      if (event.type === 'hello') {
        console.log(event.data.message);
      }
    });

    return this;
  }

  protected buildExports() {
    if (!this.initialized) {
      throw new Error('TelegramModule was not initialized');
    }

    return {
      telegramApiService: this.telegramApiService!,
    };
  }
}
