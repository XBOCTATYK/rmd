import {FAKE_ID} from '../../common/const/notifications';
import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {INotificationControl} from '../services/controls/control.types';
import {ITelegramApiService} from '../services/service.types';
import {IAppContext, ITelegramUserService} from '../telegram.types';

export function sendNotificationListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService<IAppContext>,
    notificationControl: INotificationControl
) {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.SEND_NOTIFICATION) {
      const {notificationId, dueDate, description, nextNotificationDate} = event.data;
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          `Your task: ${description} \nDue date: ${dueDate} \nNext notification: ${nextNotificationDate}`,
        notificationId > FAKE_ID ? notificationControl?.getControls(notificationId) : undefined
      );
    }
  };
}
