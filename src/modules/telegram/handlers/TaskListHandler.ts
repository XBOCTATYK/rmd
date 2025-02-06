import {Context} from 'telegraf';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {ITelegramHandler, TelegramHandlerType} from '../services/service.types';
import {IAppContext} from '../telegram.types';

export class TaskListHandler implements ITelegramHandler<IAppContext> {
  readonly type: TelegramHandlerType = 'message';
  readonly name: string = 'task-list';

  constructor(
    private readonly dataBusService: EventBusService<SchedulingEvents>,
  ) {}

  public handle = async (ctx: Context, appContext: IAppContext) => {
    const text = ctx?.text ?? '';

    if (text.toLowerCase() !== 'list') {
      return;
    }

    await this.dataBusService!.fireEvent({
      type: ESchedulingEventsType.TASK_LIST_REQUEST,
      data: {},
      metadata: {
        publicUserId: appContext.publicUserId!,
      },
    });
  };
}
