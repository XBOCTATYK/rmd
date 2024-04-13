export class TelegramUser {
  telegramId: number;
  publicUserId: string;

  constructor(telegramId: number, publicUserId: string) {
    this.telegramId = telegramId;
    this.publicUserId = publicUserId;
  }
}
