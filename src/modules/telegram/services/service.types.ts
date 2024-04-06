import {Context} from 'telegraf';

export interface ITelegramHandler {
    type: string;
    name: string;
    fn: (ctx: Context) => Promise<void>;
}

export interface ITelegramApiService {
    getProvider(): any;
    start(): void;
    addHandler(handler: ITelegramHandler): void;
}
