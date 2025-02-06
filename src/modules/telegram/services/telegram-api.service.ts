import {Context, Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {
  ITelegramApiService,
  ITelegramCommandHandler,
  ITelegramHandler,
  ITelegramMessageInterceptor,
  TelegramHandlerWithAppContextCallback,
} from './service.types';

export class TelegramApiService<TAppCtx extends object> implements ITelegramApiService<TAppCtx> {
  private readonly telegraf: Telegraf;
  private readonly callbackHandlers: TelegramHandlerWithAppContextCallback<TAppCtx>[] = [];
  private readonly messageHandlers: TelegramHandlerWithAppContextCallback<TAppCtx>[] = [];
  private readonly interceptors: ITelegramMessageInterceptor<TAppCtx>[] = [];

  constructor(token: string) {
    this.telegraf = new Telegraf(token);
  }

  public getProvider() {
    return this.telegraf;
  }

  public addHandler({type, name, handle}: ITelegramHandler<TAppCtx> | ITelegramCommandHandler) {
    if (type === 'command') {
      this.telegraf.command(name, handle);
      return;
    }

    if (type === 'message') {
      this.messageHandlers.push(handle);
      return;
    }

    if (type === 'callback') {
      this.callbackHandlers.push(handle);
      return;
    }

    throw new Error(`You specified unknown type of handler [${type}]!`);
  }

  public addInterceptor(interceptor: ITelegramMessageInterceptor<TAppCtx>) {
    this.interceptors.push(interceptor);
  }

  public async start() {
    this.telegraf.on(message('text'), this.getMainHandler());
    this.startCallbackHandlers();

    await this.telegraf.launch();
  }

  public getMainHandler() {
    return async (ctx: Context) => {
      let extraCtx = <TAppCtx>{};
      for (const interceptor of this.interceptors) {
        extraCtx = 'handle' in interceptor ?
          await interceptor.handle(ctx, extraCtx) :
          await interceptor(ctx, extraCtx);
      }
      this.messageHandlers.map((handler) => {
        handler(ctx, extraCtx).then((r) => r);
      });
    };
  }

  private startCallbackHandlers() {
    this.telegraf.on('callback_query', async (ctx) => {
      let extraCtx = <TAppCtx>{};
      for (const interceptor of this.interceptors) {
        extraCtx = 'handle' in interceptor ?
          await interceptor.handle(ctx, extraCtx) :
          await interceptor(ctx, extraCtx);
      }

      for (const handler of this.callbackHandlers) {
        handler(ctx, extraCtx);
      }
    });
  }
}
