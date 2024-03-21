import {IConfigService} from '../../types/IConfigService';

export interface IConfigModuleOptions {
  sources?: IConfigSource[];
  global?: boolean;
}

export interface IConfigModuleExports {
  configService: IConfigService
}

export interface IConfigSource {
  get(options?: IConfigModuleOptions): Record<string, unknown>;
}

export interface IConfigOptions {
  env: string;
}
