import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {ITelegramApiService} from '../services/service.types';
import {IAppContext, ITelegramUserService} from '../telegram.types';

export function taskListAcquiredListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService<IAppContext>,
) {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.TASK_LIST_ACQUIRED) {
      const allTaskInMessage = event.data.tasks.map((task) => {
        return `${task.description} \nDue date: ${task.dueDate} \nNotifications left: ${task.notificationCount}`;
      });
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService!.getUserByPublicId(event.metadata.publicUserId)).telegramId,
        allTaskInMessage.length === 0 ? 'You have no tasks' : allTaskInMessage.join('\n\n')
      );
    }
  };
}


