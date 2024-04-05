import EventEmitter from 'events';
import merge from 'lodash/merge';
import {DataBusEvent, IDataBusConnector, IListener} from '../../databus/databus.types';

export class EventEmitterDataBusConnector implements IDataBusConnector {
  private emitter: EventEmitter;
  private listeners: IListener[] = [];
  private initialConfig = {
    eventName: 'message',
  };
  private config: Record<string, string>;

  constructor(config: Record<string, string>) {
    this.emitter = new EventEmitter();
    this.config = merge(this.initialConfig, config);
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
}
