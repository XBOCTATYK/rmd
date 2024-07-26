import {Context} from 'telegraf';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {ITelegramHandler, TelegramHandlerType} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export class TaskListHandler implements ITelegramHandler {
  readonly type: TelegramHandlerType = 'message';
  readonly name: string = 'task-list';

  constructor(
    private readonly telegramUserService: ITelegramUserService,
    private readonly dataBusService: EventBusService<SchedulingEvents>,
  ) {}

  public handle = async (ctx: Context) => {
    const text = ctx?.text ?? '';

    if (text.toLowerCase() !== 'list') {
      return;
    }

    const publicUserId = (await this.telegramUserService!.getUserByTelegramId(Number(ctx.from?.id))).publicUserId;

    await this.dataBusService!.fireEvent({
      type: ESchedulingEventsType.TASK_LIST_REQUEST,
      data: {},
      metadata: {
        publicUserId,
      },
    });
  };
}
