import {ITelegramHandler} from '../services/service.types';
import {Context} from 'telegraf';

export class HelloHandler implements ITelegramHandler {
  public type: string = 'command';
  public name: string = 'hello';

  public handle = async (ctx: Context) => {
    await ctx.reply('Hello!');
  };
}
