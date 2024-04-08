import 'reflect-metadata';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {CommonModule} from './modules/common/common.module';
import {CommonModuleMigrations} from './modules/common/common.migrations';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';
import {SchedulingModuleAdapterMigrations} from './adapters/schedulingModuleAdapter/schedulingModuleAdapter.migrations';
import {evaluateModuleDataScripts} from './lib/setEntitiesToDataProvider';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');

  const migrations = [
    new CommonModuleMigrations(),
    new SchedulingModuleMigrations(),
    new SchedulingModuleAdapterMigrations(),
  ];
  const commonModule = new CommonModule(loggerService, migrations);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const dataSource = await dataProvider.getDataSource();
  await dataSource.synchronize();

  await evaluateModuleDataScripts(dataProvider, migrations);
})();
