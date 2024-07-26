import {Context} from 'telegraf';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {NotificationAnswerControl} from '../services/controls/NotificationAnswerControl';
import {ITelegramHandler, TelegramHandlerType} from '../services/service.types';

export class NotificationAnswerHandler implements ITelegramHandler {
  private eventBusService: EventBusService<SchedulingEvents>;
  private notificationAnswerControl: NotificationAnswerControl;
  constructor(eventBusService: EventBusService<SchedulingEvents>, notificationAnswerControl: NotificationAnswerControl) {
    this.eventBusService = eventBusService;
    this.notificationAnswerControl = notificationAnswerControl;
  }

  public readonly name: string = 'notification-answer';
  public readonly type: TelegramHandlerType = 'callback';

  public handle = async (ctx: Context): Promise<void> => {
    const {notificationId = 0, answer} = await this.notificationAnswerControl.handleControl(ctx);

    await this.eventBusService.fireEvent({
      type: ESchedulingEventsType.NOTIFICATION_ANSWER,
      data: {notificationId, answer},
    });
  };
}
