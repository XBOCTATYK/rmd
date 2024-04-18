import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {INotificationControl} from '../services/controls/control.types';
import {ITelegramApiService} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export function sendNotificationListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService,
    notificationControl: INotificationControl
) {
  return async function(event: SchedulingEvents) {
    if (event.type === 'send-notification') {
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          event.data.description + '\n' + event.data.dueDate,
          notificationControl?.getControls(event.data.notificationId)
      );
    }
  };
}
