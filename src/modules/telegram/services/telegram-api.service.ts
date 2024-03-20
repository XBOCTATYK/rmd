import {Telegraf} from 'telegraf';
import {ITelegramApiService} from './service.types';

export class TelegramApiService implements ITelegramApiService {
  private readonly telegraf: Telegraf;

  constructor(token: string) {
    this.telegraf = new Telegraf(token);
  }

  public getProvider() {
    return this.telegraf;
  }

  public async start() {
    await this.telegraf.launch();
  }
}
