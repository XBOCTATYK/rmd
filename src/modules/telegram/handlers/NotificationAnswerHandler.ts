import {Context} from 'telegraf';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationAnswerControl} from '../services/controls/NotificationAnswerControl';
import {ITelegramHandler, TelegramHandlerType} from '../services/service.types';
import {IAppContext} from '../telegram.types';

export class NotificationAnswerHandler implements ITelegramHandler<IAppContext> {
  constructor(
    private readonly eventBusService: EventBusService<SchedulingEvents>,
    private readonly notificationAnswerControl: NotificationAnswerControl
  ) {}

  public readonly name: string = 'notification-answer';
  public readonly type: TelegramHandlerType = 'callback';

  public handle = async (ctx: Context, appContext?: IAppContext): Promise<void> => {
    const {notificationId = 0, answer} = await this.notificationAnswerControl.handleControl(ctx);

    await this.eventBusService.fireEvent({
      type: ESchedulingEventsType.NOTIFICATION_ANSWER,
      data: {notificationId, answer},
      metadata: {
        publicUserId: appContext?.publicUserId!,
      },
    });
  };
}
