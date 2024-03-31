import {DataSource} from 'typeorm';

export interface IDataSource {
    openSession(): void
    closeSession(): void
}

export interface IDataProvider {
    getDataSource(): DataSource
    connect(): Promise<DataSource>
    disconnect(): Promise<void>
}

export interface ICommonModuleConfig {
    db: IDataSourceConfiguration
}

export interface IDataSourceConfiguration {
    host: string
    port: number
    username: string
    password: string
    database: string,
    schema: string,
    logging: boolean
}

export interface ICommonModuleExports {
    dataProvider: IDataProvider
}
