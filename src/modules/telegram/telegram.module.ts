import {IAuthUserService} from '../common/common.types';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ILoggerService} from '../common/service/service.types';
import {EventBusService} from '../databus/services/eventBusService';
import {HelloHandler} from './handlers/HelloHandler';
import {TaskCreationHandler} from './handlers/TaskCreationHandler';
import {NotificationAnswerControl} from './services/controls/NotificationAnswerControl';
import {ITelegramApiService} from './services/service.types';
import {TelegramApiService} from './services/telegram-api.service';
import {TelegramUserService} from './services/TelegramUserService';
import {ITelegramModuleConfig, ITelegramModuleExports} from './telegram.types';

export class TelegramModule extends AbstractAuthModule<ITelegramModuleConfig, ITelegramModuleExports> {
  private loggerService: ILoggerService;
  private readonly dataBusService: EventBusService<SchedulingEvents>;
  private readonly authService: IAuthUserService;
  private telegramApiService?: ITelegramApiService;
  private telegramUserService?: TelegramUserService;
  private notificationControl?: NotificationAnswerControl;

  constructor(
      loggerService: ILoggerService,
      dataBusService: EventBusService<SchedulingEvents>,
      authService: IAuthUserService,
  ) {
    super('telegram');

    this.loggerService = loggerService;
    this.dataBusService = dataBusService;
    this.authService = authService;
  }

  protected async initModule(config: ITelegramModuleConfig) {
    this.telegramApiService = new TelegramApiService(config.token);
    this.telegramUserService = new TelegramUserService(
        config.publicUserHashSecret,
        config.iv
    );
    this.notificationControl = new NotificationAnswerControl();

    this.loggerService.info('TelegramModule initialized');
    await this.dataBusService.addListener('telegram', async (event) => {
      if (event.type === 'hello') {
        console.log(event.data.message);
      }

      if (event.type === 'send-notification') {
        this.telegramApiService?.getProvider().telegram.sendMessage(
            (await this.telegramUserService!.getUserByPublicId(event.data.publicUserId)).telegramId,
            event.data.description + '\n' + event.data.dueDate,
            this.notificationControl?.getControls(event.data.notificationId)
        );
      }
    });

    const handlers = [
      new HelloHandler(),
      new TaskCreationHandler(this.authService, this.dataBusService),
    ];

    for (const handler of handlers) {
      this.telegramApiService.addHandler(handler);
    }

    await this.telegramApiService.start();

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
