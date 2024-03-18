import {IAppModule} from '../../types/IAppModule';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

class SchedulingModule implements IAppModule<ISchedulingModuleConfig, Record<string, any>> {
  public name: string = 'scheduling';

  public config: ISchedulingModuleConfig = {
    scheduler: null,
  };

  public init(config: ISchedulingModuleConfig) {
    this.config = config;

    console.log('SchedulingModule initialized');
    return this;
  }
  public start() {}
  public stop() {}
  public exports() {
    return {};
  }
}
