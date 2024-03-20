import {ITelegramApiService} from './services/service.types';

export interface ITelegramModuleConfig {
    token: string
}

export interface ITelegramModuleExports {
    telegramApiService: ITelegramApiService
}
