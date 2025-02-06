import {Context, Telegraf} from 'telegraf';

export type TelegramHandlerType = 'message' | 'callback';

export type TelegramHandlerCallback = (ctx: Context) => Promise<void>;
export type TelegramHandlerWithAppContextCallback<T extends object> = (ctx: Context, appCtx: T) => Promise<void>;

export interface ITelegramHandler<TAppCtx extends object> {
    readonly type: TelegramHandlerType;
    readonly name: string;
    readonly handle: TelegramHandlerWithAppContextCallback<TAppCtx>;
}

export interface ITelegramCommandHandler {
    type: 'command';
    readonly name: string;
    readonly handle: TelegramHandlerCallback;
}

export interface ITelegramApiService<TAppCtx extends object> {
    getProvider(): Telegraf;
    start(): void;
    addHandler(handler: ITelegramHandler<TAppCtx> | ITelegramCommandHandler): void;
    addInterceptor(interceptor: ITelegramMessageInterceptor<TAppCtx>): void;
}

export type ITelegramMessageInterceptor<TAppCtx> = ((ctx: Context, appCtx: TAppCtx) => Promise<TAppCtx>) | {
    handle: (ctx: Context, appCtx: TAppCtx) => Promise<TAppCtx>;
};
