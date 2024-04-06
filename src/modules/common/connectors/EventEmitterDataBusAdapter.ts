import EventEmitter from 'events';
import merge from 'lodash/merge';
import {
  DataBusEvent,
  IDataBusAdapter,
  IDataBusAdapterConfig,
  IListener,
} from '../../databus/databus.types';

export class EventEmitterDataBusAdapter implements IDataBusAdapter {
  private emitter: EventEmitter;
  private listeners: IListener[] = [];
  private initialConfig = {
    eventName: 'message',
    maxListeners: 4,
  };
  private config: IDataBusAdapterConfig;

  constructor(config: Partial<IDataBusAdapterConfig>) {
    this.emitter = new EventEmitter();
    this.config = merge(this.initialConfig, config);

    this.emitter.setMaxListeners(this.config.maxListeners);
  }

  async addEvent<T extends Record<string, any>>(topic: string, event: DataBusEvent<T>) {
    this.emitter.emit(this.config.eventName, event);
  }

  async addListener(name: string, fn: (data: DataBusEvent<Record<string, any>>) => unknown) {
    this.listeners.push({name, fn});
    this.emitter.on(this.config.eventName, fn);
  }

  async removeListener(name: string) {
    this.listeners.filter((listener) => listener.name !== name)
        .forEach((listener) => this.emitter.off('message', listener.fn));
  }

  async addErrorHandler(fn: (e: Error) => unknown) {
    this.emitter.on('error', fn);
  }
}
