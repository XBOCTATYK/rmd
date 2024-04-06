export type DataBusEvent<T> = {
    type: string,
    data: T
}

export interface IDataBusAdapter {
    addEvent: (topic: string, event: DataBusEvent<Record<string, any>>) => Promise<void>
    addListener: (name: string, fn: (data: DataBusEvent<Record<string, any>>) => unknown) => Promise<void>
    removeListener: (name: string) => Promise<void>
    addErrorHandler: (fn: (e: Error) => unknown) => Promise<void>
}

export interface IListener {
    name: string;
    fn: (data: DataBusEvent<Record<string, any>>) => unknown
}

export interface IDataBusAdapterConfig {
    eventName: string
    maxListeners: number
}
