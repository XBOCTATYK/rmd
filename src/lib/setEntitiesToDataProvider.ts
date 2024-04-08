import {IDataProvider} from '../modules/common/common.types';
import {IMigrationHolder} from '../types/IMigrationHolder';
import {DataSource} from 'typeorm';

export function setEntitiesToDataProvider(dataProvider: IDataProvider, modules: IMigrationHolder[]): DataSource {
  const allEntities = [];
  for (const module of modules) {
    const {entities} = module.migrations();

    allEntities.push(...entities);
  }

  const dataSource = dataProvider.getUninitializedDataSource();
  // @ts-ignore
  dataSource.setOptions({entities: allEntities});

  return dataSource;
}

export async function evaluateModuleDataScripts(dataProvider: IDataProvider, modules: IMigrationHolder[]): Promise<IDataProvider> {
  const allScripts = [];
  for (const module of modules) {
    const {scripts} = module.migrations();
    allScripts.push(...scripts);
  }

  for (const script of allScripts) {
    await script(dataProvider);
  }

  return dataProvider;
}
