import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {ITelegramApiService} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export function taskCreatedListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService
) {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.TASK_CREATED) {
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          `Task successfully added! 
          \n${event.data.description} \nDue date: ${event.data.dueDate} 
          \nCloser notification: ${event.data.firsNotificationDate}`
      );
    }
  };
}
