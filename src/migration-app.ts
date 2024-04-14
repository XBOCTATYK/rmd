import 'reflect-metadata';
import {AuthModuleMigrations} from './adapters/authModuleAdapter/authModule.migrations';
import {SchedulingModuleAdapterMigrations} from './adapters/schedulingModuleAdapter/schedulingModuleAdapter.migrations';
import {evaluateModuleDataScripts} from './lib/setEntitiesToDataProvider';
import {CommonModule} from './modules/common/common.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');

  const migrations = [
    new AuthModuleMigrations(),
    new SchedulingModuleMigrations(),
    new SchedulingModuleAdapterMigrations(),
  ];
  const commonModule = new CommonModule(loggerService, migrations);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const dataSource = await dataProvider.getDataSource();
  await dataSource.synchronize();

  await evaluateModuleDataScripts(dataProvider, migrations);
})();
