import merge from 'lodash/merge';
import get from 'lodash/get';

import {IConfigModuleOptions} from '../config.types';
import {IConfigService} from '../../../types/IConfigService';

const DEFAULT_OPTIONS = {
  sources: [],
  global: false,
};

export class ConfigService implements IConfigService {
  private readonly mergedConfig: Record<string, unknown> = {};

  constructor(outerOptions: IConfigModuleOptions = DEFAULT_OPTIONS) {
    const options = {...DEFAULT_OPTIONS, ...outerOptions};

    this.mergedConfig = options.sources.reduce(
        (acc, item) => merge(acc, item.get(options)),
        {},
    );
  }

  get<T>(name?: string): T {
    if (!name) return this.mergedConfig as T;

    return get(this.mergedConfig, name) as T;
  }
}
