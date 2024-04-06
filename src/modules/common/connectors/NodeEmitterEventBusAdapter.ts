import EventEmitter from 'events';
import merge from 'lodash/merge';
import {
  DataBusEvent,
  IEventBusAdapter,
  IDataBusAdapterConfig,
  IListener,
} from '../../databus/databus.types';

export class NodeEmitterEventBusAdapter implements IEventBusAdapter {
  private emitter: EventEmitter;
  private listeners: IListener<unknown>[] = [];
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

  async addEvent(topic: string, event: unknown) {
    this.emitter.emit(this.config.eventName, event);
  }

  async addListener(name: string, fn: (data: unknown) => unknown) {
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
