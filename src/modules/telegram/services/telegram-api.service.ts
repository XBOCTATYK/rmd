import {Context, Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {ITelegramApiService, ITelegramHandler, TelegramHandlerCallback} from './service.types';

export class TelegramApiService implements ITelegramApiService {
  private readonly telegraf: Telegraf;
  private readonly callbackHandlers: TelegramHandlerCallback[] = [];
  private readonly messageHandlers: TelegramHandlerCallback[] = [];

  constructor(token: string) {
    this.telegraf = new Telegraf(token);
  }

  public getProvider() {
    return this.telegraf;
  }

  public addHandler({type, name, handle}: ITelegramHandler) {
    if (type === 'command') {
      this.telegraf.command(name, handle);
      return;
    }

    if (type === 'message') {
      this.messageHandlers.push(handle);
      return;
    }

    if (type === 'callback') {
      this.callbackHandlers.push(handle);
      return;
    }

    throw new Error(`You specified unknown type of handler [${type}]!`);
  }

  public async start() {
    this.telegraf.on(message('text'), this.getMainHandler());
    this.startCallbackHandlers();

    await this.telegraf.launch();
  }

  public getMainHandler() {
    return async (ctx: Context) => {
      this.messageHandlers.map((handler) => {
        handler(ctx).then((r) => r);
      });
    };
  }

  private startCallbackHandlers() {
    this.telegraf.on('callback_query', (ctx) => {
      for (const handler of this.callbackHandlers) {
        handler(ctx);
      }
    });
  }
}
