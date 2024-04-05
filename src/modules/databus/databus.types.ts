export type DataBusEvent<T> = {
    type: string,
    data: T
}

export interface IDataBusConnector {
    addEvent: (topic: string, event: DataBusEvent<Record<string, any>>) => Promise<void>
    addListener: (name: string, fn: (data: DataBusEvent<Record<string, any>>) => unknown) => Promise<void>
    removeListener: (name: string) => Promise<void>
}

export interface IListener {
    name: string;
    fn: (data: DataBusEvent<Record<string, any>>) => unknown
}
