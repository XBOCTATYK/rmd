import {IAppModule} from '../../../types/IAppModule';

export abstract class AbstractAuthModule<
    TConfig extends Pick<string | symbol, any>,
    TExports extends Pick<string | symbol, any>
> implements IAppModule<TConfig, TExports> {
  protected initialized = false;
  protected config?: TConfig;

  protected constructor(private readonly name: string) {}

    protected abstract initModule(config?: TConfig): Promise<this>;

    protected abstract buildExports(): TExports;

    public async init(config?: TConfig) {
      this.config = config;
      await this.initModule(config);
      this.initialized = true;
      return this;
    }

    public exports() {
      if (!this.initialized) {
        throw new Error(`Module ${this.name} not initialized yet!`);
      }
      return this.buildExports() as TExports;
    }

    public isInitialized() {
      return this.initialized;
    }
}
