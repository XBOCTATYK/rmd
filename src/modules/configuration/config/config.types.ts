export interface ConfigModuleOptions {
  sources?: ConfigSource[];
  global?: boolean;
}

export interface ConfigSource {
  get(options?: ConfigModuleOptions): { [x: string]: any };
}
