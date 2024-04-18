import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';
import {ITelegramApiService} from '../services/service.types';
import {ITelegramUserService} from '../telegram.types';

export function taskListAcquiredListener(
    telegramUserService: ITelegramUserService,
    telegramApiService: ITelegramApiService,
) {
  return async function(event: SchedulingEvents) {
    if (event.type === 'task-list-acquired') {
      const allTaskInMessage = event.data.tasks.map((task) => {
        return `${task.description} \nDue date: ${task.dueDate} \nNotifications left: ${task.notificationCount}`;
      });
      telegramApiService?.getProvider().telegram.sendMessage(
          (await telegramUserService!.getUserByPublicId(event.metadata.publicUserId)).telegramId,
          allTaskInMessage.join('\n\n')
      );
    }
  };
}


