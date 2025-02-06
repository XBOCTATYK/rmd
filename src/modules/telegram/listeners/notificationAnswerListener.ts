import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {ITelegramApiService} from '../services/service.types';
import {IAppContext, ITelegramUserService} from '../telegram.types';

export function notificationAnswerListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService<IAppContext>,
) {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.NOTIFICATION_ANSWER_PROCESSING_ERROR) {
      await telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          `Oh, wait! ${event.data.error}`
      );
    }
  };
}
