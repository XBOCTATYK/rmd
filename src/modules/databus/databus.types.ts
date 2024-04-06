import {DataBusFactoryService} from './services/dataBusFactoryService';

export interface IDataBusModuleConfig {}

export interface IDataBusModuleExports {
    dataBusFactory: DataBusFactoryService
}

export type DataBusEvent<T> = {
    type: string,
    data: T,
    metadata?: Record<string, string>
}

export interface IEventBusAdapter {
    addEvent: (topic: string, event: unknown) => Promise<void>
    addListener: (name: string, fn: (event: any) => unknown) => Promise<void>
    removeListener: (name: string) => Promise<void>
    addErrorHandler: (fn: (e: Error) => unknown) => Promise<void>
}

export interface IListener<T extends DataBusEvent<unknown> > {
    name: string;
    fn: (event: T) => unknown
}

export interface IDataBusAdapterConfig {
    eventName: string
    maxListeners: number
}
