import {Context, Telegraf} from 'telegraf';

export interface ITelegramHandler {
    type: string;
    name: string;
    handle: (ctx: Context) => Promise<void>;
}

export interface ITelegramApiService {
    getProvider(): Telegraf;
    start(): void;
    addHandler(handler: ITelegramHandler): void;
}
