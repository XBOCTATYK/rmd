import {Context} from 'telegraf';
import {ITelegramCommandHandler} from '../services/service.types';

export class HelloHandler implements ITelegramCommandHandler {
  public readonly type = 'command';
  public readonly name = 'hello';

  public handle = async (ctx: Context) => {
    await ctx.reply('Hello!');
  };
}
