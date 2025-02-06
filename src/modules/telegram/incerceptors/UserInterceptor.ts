import {Context} from 'telegraf';
import {IAppContext, ITelegramUserService} from '../telegram.types';

export class UserInterceptor {
  constructor(
    private readonly telegramUserService: ITelegramUserService
  ) {}

  async handle(ctx: Context, appContext: IAppContext) {
    if (!appContext.publicUserId) {
      appContext.publicUserId = (
        await this.telegramUserService.getUserByTelegramId(Number(ctx.from?.id))
      ).publicUserId;
    }

    return appContext;
  }
}
