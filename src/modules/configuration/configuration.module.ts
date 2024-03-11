import {IConfigService} from '../../types/IConfigService';
import {ConfigService} from './services/config.service';
import {IConfigOptions} from './config.types';
import {LocalJsonSource} from './services/sources/LocalJsonSource';

export class ConfigurationModule implements ConfigurationModule {
  configService?: IConfigService;
  initialized = false;

  start() {
    console.log('ConfigurationModule started');
  }

  stop() {
    console.log('ConfigurationModule stopped');
  }

  init(options: IConfigOptions) {
    console.log('ConfigurationModule initialized');
    this.configService = new ConfigService({
      sources: ['common', options.env].map(
          (configName) => new LocalJsonSource({configName, path: './config'})
      ),
      global: false,
    });

    this.initialized = true;
    return this;
  }

  exports() {
    if (!this.initialized) {
      throw new Error('ConfigurationModule was not initialized');
    }

    return {
      configService: this.configService,
    };
  }
}
