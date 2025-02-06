import {Context} from 'telegraf';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {ITelegramHandler} from '../services/service.types';
import {IAppContext} from '../telegram.types';

export class TaskCreationHandler implements ITelegramHandler<IAppContext> {
  public readonly name = 'task-creation';
  public readonly type = 'message';

  public static readonly DEFAULT_PRIORITY = 2;

  constructor(private readonly dataBusService: EventBusService<SchedulingEvents>) {}

  public handle = async (ctx: Context, appContext: IAppContext) => {
    const text = ctx?.text ?? '';
    const [type, description, date, time, priority] = text?.split('\n') ?? ['', '', '', '', ''];

    if (type.toLowerCase() !== 'task') {
      return;
    }

    const task = {
      date,
      time,
      description,
      priority: Number(priority || TaskCreationHandler.DEFAULT_PRIORITY),
      repeat: undefined,
    };

    await this.dataBusService.fireEvent({
      type: ESchedulingEventsType.NEW_TASK,
      data: task,
      metadata: {
        publicUserId: appContext.publicUserId!,
      },
    });
  };
}
