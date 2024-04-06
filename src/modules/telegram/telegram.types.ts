import {ITelegramApiService} from './services/service.types';

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
