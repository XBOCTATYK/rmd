import {IConfigService} from '../../types/IConfigService';
import {ConfigService} from './services/config.service';
import {IConfigModuleExports, IConfigOptions} from './config.types';
import {LocalJsonSource} from './services/sources/LocalJsonSource';
import {IAppModule} from '../../types/IAppModule';

export class ConfigurationModule implements IAppModule<IConfigOptions, IConfigModuleExports> {
  configService?: IConfigService;
  initialized = false;

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
      configService: this.configService!,
    };
  }
}
