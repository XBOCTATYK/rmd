import {IAuthUserService} from '../common/common.types';
import {SchedulingEvents} from '../common/databus/schedulingMessaging.types';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';
import {ILoggerService} from '../common/service/service.types';
import {EventBusService} from '../databus/services/eventBusService';
import {HelloHandler} from './handlers/HelloHandler';
import {NotificationAnswerHandler} from './handlers/NotificationAnswerHandler';
import {TaskCreationHandler} from './handlers/TaskCreationHandler';
import {TaskListHandler} from './handlers/TaskListHandler';
import {helloListener} from './listeners/helloListener';
import {sendNotificationListener} from './listeners/sendNotificationListener';
import {taskListAcquiredListener} from './listeners/taskListAcquiredListener';
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
  private readonly notificationControl: NotificationAnswerControl;

  constructor(
      loggerService: ILoggerService,
      dataBusService: EventBusService<SchedulingEvents>,
      authService: IAuthUserService,
  ) {
    super('telegram');

    this.loggerService = loggerService;
    this.dataBusService = dataBusService;
    this.authService = authService;
    this.notificationControl = new NotificationAnswerControl();
  }

  protected async initModule(config: ITelegramModuleConfig) {
    this.telegramApiService = new TelegramApiService(config.token);
    this.telegramUserService = new TelegramUserService(
        config.publicUserHashSecret,
        config.iv
    );

    await this.initListeners();
    await this.initHandlers();
    await this.telegramApiService.start();

    this.loggerService.info('TelegramModule initialized');

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

  private async initListeners() {
    const listeners = [
      sendNotificationListener(this.telegramUserService!, this.telegramApiService!, this.notificationControl),
      taskListAcquiredListener(this.telegramUserService!, this.telegramApiService!),
      helloListener(),
    ];

    await this.dataBusService.addListener('telegram', async (event) => {
      await Promise.all(listeners.map((listener) => listener(event)));
    });
  }

  private async initHandlers() {
    const handlers = [
      new HelloHandler(),
      new TaskCreationHandler(this.telegramUserService!, this.dataBusService),
      new NotificationAnswerHandler(this.dataBusService, this.notificationControl!),
      new TaskListHandler(this.telegramUserService!, this.dataBusService),
    ];

    for (const handler of handlers) {
      this.telegramApiService!.addHandler(handler);
    }
  }
}
