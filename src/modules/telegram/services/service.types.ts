import {Context, Telegraf} from 'telegraf';

export type TelegramHandlerType = 'command' | 'message' | 'callback';

export type TelegramHandlerCallback = (ctx: Context) => Promise<void>;

export interface ITelegramHandler {
    readonly type: TelegramHandlerType;
    readonly name: string;
    readonly handle: TelegramHandlerCallback;
}

export interface ITelegramApiService {
    getProvider(): Telegraf;
    start(): void;
    addHandler(handler: ITelegramHandler): void;
}
