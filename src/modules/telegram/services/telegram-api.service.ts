import {Telegraf} from 'telegraf';
import {ITelegramApiService, ITelegramHandler} from './service.types';
import {message} from 'telegraf/filters';

export class TelegramApiService implements ITelegramApiService {
  private readonly telegraf: Telegraf;

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

    throw new Error(`You specified unknown type of handler [${type}]!`);
  }

  public async start() {
    await this.telegraf.launch();
  }
}
