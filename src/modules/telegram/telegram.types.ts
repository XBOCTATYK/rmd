import {ITelegramApiService} from './services/service.types';

export interface ITelegramModuleConfig {
    token: string
    publicUserHashSecret: string
}

export interface ITelegramModuleExports {
    telegramApiService: ITelegramApiService
}
