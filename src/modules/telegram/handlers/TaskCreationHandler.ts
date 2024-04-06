import {Context} from 'telegraf';
import {IAuthUserService} from '../../common/common.types';
import {ITelegramHandler} from '../services/service.types';
import {EventBusService} from '../../databus/services/eventBusService';
import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';

export class TaskCreationHandler implements ITelegramHandler {
  private authService: IAuthUserService;
  private dataBusService: EventBusService<SchedulingEvents>;

  public name = 'task-creation';
  public type = 'message';

  constructor(authService: IAuthUserService, dataBusService: EventBusService<SchedulingEvents>) {
    this.authService = authService;
    this.dataBusService = dataBusService;
  }

  public handle = async (ctx: Context) => {
    if (await this.authService.checkPermission('create-task', String(ctx.from?.id))) {
      const text = ctx?.text ?? '';
      const [description, date, time, priority] = text?.split('\n') ?? ['', '', '', ''];

      const task = {
        date,
        time,
        description,
        priority: Number(priority),
        repeat: undefined,
      };

      await this.dataBusService.fireEvent({type: 'new-task', data: task});
    }
  };
}
