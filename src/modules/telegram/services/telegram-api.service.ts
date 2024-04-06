import {Telegraf} from 'telegraf';
import {ITelegramApiService, ITelegramHandler} from './service.types';

export class TelegramApiService implements ITelegramApiService {
  private readonly telegraf: Telegraf;

  constructor(token: string) {
    this.telegraf = new Telegraf(token);
  }

  public getProvider() {
    return this.telegraf;
  }

  public addHandler({type, name, fn}: ITelegramHandler) {
    if (type === 'command') {
      this.telegraf.command(name, fn);
      return;
    }

    if (type === 'message') {
      this.telegraf.on('message', fn);
      return;
    }

    throw new Error(`You specified unknown type of handler [${type}]!`);
  }

  public async start() {
    await this.telegraf.launch();
  }
}
