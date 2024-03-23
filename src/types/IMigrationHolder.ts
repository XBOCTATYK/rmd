import {IDataProvider} from '../modules/common/common.types';

export interface IEntity {
    name: string
}

export interface IModuleMigration {
    entities: IEntity[],
    scripts: Array<(datProvider: IDataProvider) => Promise<void>>
}

export interface IMigrationHolder {
    migrations: () => IModuleMigration
}
