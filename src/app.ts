import 'reflect-metadata';
import {TelegramModule} from './modules/telegram/telegram.module';

const tgApp = new TelegramModule();

tgApp
    .init({token: 'token'})
    .start();
