import {IAppModule} from '../../../types/IAppModule';

export abstract class AbstractAuthModule<
    T extends Pick<string | symbol, any>,
    K extends Pick<string | symbol, any>
> implements IAppModule<T, K> {
  protected initialized = false;
  protected config?: T;
  private readonly name: string;

  protected constructor(name: string) {
    this.name = name;
  }

    protected abstract initModule(config: T): Promise<this>;

    protected abstract buildExports(): K;

    public async init(config: T) {
      this.config = config;
      await this.initModule(config);
      this.initialized = true;
      return this;
    }

    public exports() {
      if (!this.initialized) {
        throw new Error(`Module ${this.name} not initialized yet!`);
      }
      return this.buildExports() as K;
    }

    public isInitialized() {
      return this.initialized;
    }
}
