export interface IConfigModuleOptions {
  sources?: IConfigSource[];
  global?: boolean;
}

export interface IConfigSource {
  get(options?: IConfigModuleOptions): Record<string, unknown>;
}

export interface IConfigOptions {
  env: string;
}
