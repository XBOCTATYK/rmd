import {Telegraf} from 'telegraf';
import {ITelegramApiService, ITelegramHandler, TelegramHandlerCallback} from './service.types';
import {message} from 'telegraf/filters';

export class TelegramApiService implements ITelegramApiService {
  private readonly telegraf: Telegraf;
  private readonly callbackHandlers: TelegramHandlerCallback[] = [];

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
      this.telegraf.on(message('text'), handle);
      return;
    }

    if (type === 'callback') {
      this.callbackHandlers.push(handle);
      return;
    }

    throw new Error(`You specified unknown type of handler [${type}]!`);
  }

  public async start() {
    this.startCallbackHandlers();

    await this.telegraf.launch();
  }

  private startCallbackHandlers() {
    this.telegraf.on('callback_query', (ctx) => {
      for (const handler of this.callbackHandlers) {
        handler(ctx);
      }
    });
  }
}
