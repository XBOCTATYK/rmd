import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {INotificationControl} from '../services/controls/control.types';
import {ITelegramApiService} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export function sendNotificationListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService,
    notificationControl: INotificationControl
) {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.SEND_NOTIFICATION) {
      const {notificationId, dueDate, description, nextNotificationDate} = event.data;
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          `Your task: ${description} \nDue date: ${dueDate} \nNext notification: ${nextNotificationDate}`,
          notificationControl?.getControls(notificationId)
      );
    }
  };
}
