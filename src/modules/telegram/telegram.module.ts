import {IAppModule} from '../../types/IAppModule';
import {TelegramModuleConfig} from './telegram.types';

export class TelegramModule implements IAppModule<any, any> {
  private initialized = false;
  private config = {};

  init(config: TelegramModuleConfig) {
    this.config = config;

    this.initialized = true;
    console.log('TelegramModule initialized');
    return this;
  }

  start() {
    console.log('TelegramModule started');
  }

  stop() {
    console.log('TelegramModule stopped');
  }

  exports() {
    return {};
  }
}
