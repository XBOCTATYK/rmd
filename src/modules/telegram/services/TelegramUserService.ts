import {createCipheriv, createDecipheriv} from 'crypto';
import {TelegramUser} from '../model';
import {ITelegramUserService} from '../telegram.types';

export class TelegramUserService implements ITelegramUserService {
  private readonly secretHash: string;
  private readonly iv: string;
  private algorithm = 'aes-256-cbc';

  constructor(secretHash: string, iv: string) {
    this.secretHash = secretHash;
    this.iv = iv;
  }

  async getUserByPublicId(publicUserId: string): Promise<TelegramUser> {
    const decipher = createDecipheriv(this.algorithm, this.secretHash, this.iv);
    const decrypted = Buffer.concat([decipher.update(publicUserId, 'hex'), decipher.final()]);

    return new TelegramUser(
        Number(decrypted.toString()),
        publicUserId,
    );
  }

  async getUserByTelegramId(telegramId: number): Promise<TelegramUser> {
    const cipher = createCipheriv(this.algorithm, this.secretHash, this.iv);

    const encrypted = cipher.update(telegramId.toString());
    const publicUserId = Buffer.concat([encrypted, cipher.final()]).toString('hex');

    return new TelegramUser(
        telegramId,
        publicUserId,
    );
  }
}
