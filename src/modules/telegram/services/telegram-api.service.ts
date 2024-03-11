import {Telegraf} from 'telegraf';

export class TelegramApiService {
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
