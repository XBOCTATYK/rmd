
import { ConfigModuleOptions } from '../config/config.types';
import merge from 'lodash/merge';
import {IConfigService} from "../../../types/IConfigService";

const DEFAULT_OPTIONS = {
  sources: [],
  global: false
}

export class ConfigService implements IConfigService {
  private readonly mergedConfig: { [x: string]: unknown } = {};

  constructor(outerOptions: ConfigModuleOptions = DEFAULT_OPTIONS) {
    const options = { ...DEFAULT_OPTIONS, ...outerOptions };

    this.mergedConfig = options.sources.reduce(
      (acc, item) => merge(acc, item.get(options)),
      {},
    );
  }

  get<T>(name?: string): T {
    if (!name) return this.mergedConfig as T;

    return this.mergedConfig[name] as T;
  }
}
