import {ITelegramApiService} from './services/service.types';
import {TelegramUser} from './model/TelegramUser';
import {Markup} from 'telegraf';
import {InlineKeyboardMarkup} from 'telegraf/src/core/types/typegram';

export interface ITelegramModuleConfig {
    token: string
    publicUserHashSecret: string
    iv: string
}

export interface ITelegramModuleExports {
    telegramApiService: ITelegramApiService
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
