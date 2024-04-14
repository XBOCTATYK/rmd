import {ITelegramHandler} from '../services/service.types';
import {Context} from 'telegraf';

export class HelloHandler implements ITelegramHandler {
  public readonly type = 'command';
  public readonly name = 'hello';

  public handle = async (ctx: Context) => {
    await ctx.reply('Hello!');
  };
}
