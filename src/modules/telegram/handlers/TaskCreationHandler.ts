import {Context} from 'telegraf';
import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {ITelegramHandler} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export class TaskCreationHandler implements ITelegramHandler {
  private readonly telegramUserService: ITelegramUserService;
  private readonly dataBusService: EventBusService<SchedulingEvents>;

  public readonly name = 'task-creation';
  public readonly type = 'message';

  constructor(authService: ITelegramUserService, dataBusService: EventBusService<SchedulingEvents>) {
    this.telegramUserService = authService;
    this.dataBusService = dataBusService;
  }

  public handle = async (ctx: Context) => {
    const text = ctx?.text ?? '';
    const [type, description, date, time, priority] = text?.split('\n') ?? ['', '', '', '', ''];

    if (type.toLowerCase() !== 'task') {
      return;
    }

    const task = {
      date,
      time,
      description,
      priority: Number(priority),
      repeat: undefined,
    };

    const publicUserId = (await this.telegramUserService.getUserByTelegramId(Number(ctx.from?.id))).publicUserId;
    await this.dataBusService.fireEvent({
      type: 'new-task',
      data: task,
      metadata: {
        publicUserId,
      },
    });
  };
}
