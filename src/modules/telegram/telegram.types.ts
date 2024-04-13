import {ITelegramApiService} from './services/service.types';
import {TelegramUser} from './model/TelegramUser';

export interface ITelegramModuleConfig {
    token: string
    publicUserHashSecret: string
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
