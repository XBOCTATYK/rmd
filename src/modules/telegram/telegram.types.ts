import {Markup} from 'telegraf';
import {InlineKeyboardMarkup} from 'telegraf/src/core/types/typegram';
import {TelegramUser} from './model/TelegramUser';
import {ITelegramApiService} from './services/service.types';

export interface ITelegramModuleConfig {
    token: string
    publicUserHashSecret: string
    iv: string
}

export type IAppContext = Partial<{
    publicUserId: string
}>

export interface ITelegramModuleExports {
    telegramApiService: ITelegramApiService<IAppContext>
}

export interface IMessageMapper {
    validate: (message: string) => boolean
    map: (message: string) => string
}

export interface ITelegramUserService {
    getUserByTelegramId: (telegramId: number) => Promise<TelegramUser>
    getUserByPublicId: (publicUserId: string) => Promise<TelegramUser>
}

export interface ITelegramControl<T> {
    getControls: (notification: T) => Markup.Markup<InlineKeyboardMarkup>
}
