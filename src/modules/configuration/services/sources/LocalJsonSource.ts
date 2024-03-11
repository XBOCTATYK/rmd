import {IConfigSource} from '../../config.types';
import * as fs from 'fs';
import * as path from 'path';

interface LocalJsonSourceOptions {
  path: string;
  configName: string;
}

/**
 * Reads config from local json file
 */
export class LocalJsonSource implements IConfigSource {
  config = {};
  path = './config';

  constructor(sourceOptions: LocalJsonSourceOptions) {
    this.path = sourceOptions.path;
    this.config = this.readConfigFile(sourceOptions.configName);
  }

  get() {
    return this.config;
  }

  private readConfigFile(name: string) {
    return JSON.parse(
        fs.readFileSync(path.resolve(this.path, `${name}.json`), 'utf-8'),
    );
  }
}
