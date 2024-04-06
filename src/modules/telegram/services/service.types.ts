import {Context} from 'telegraf';

export interface ITelegramHandler {
    type: string;
    name: string;
    handle: (ctx: Context) => Promise<void>;
}

export interface ITelegramApiService {
    getProvider(): any;
    start(): void;
    addHandler(handler: ITelegramHandler): void;
}
