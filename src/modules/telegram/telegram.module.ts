import {IAppModule} from '../../types/IAppModule';

export class TelegramModule implements IAppModule<any, any> {
  init(config: any) {
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
