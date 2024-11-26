import 'reflect-metadata';
import {AuthModuleAdapterMigrations} from './adapters/authModuleAdapter/authModuleAdapter.migrations';
import {SchedulingModuleAdapterMigrations} from './adapters/schedulingModuleAdapter/schedulingModuleAdapter.migrations';
import {UserSettingsAdapterMigrations} from './adapters/userSettingsModuleAdapter/userSettingsAdapter.migrations';
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
    new AuthModuleAdapterMigrations(),
    new SchedulingModuleMigrations(),
    new SchedulingModuleAdapterMigrations(),
    new UserSettingsAdapterMigrations(),
  ];
  const commonModule = new CommonModule(loggerService, migrations);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const dataSource = await dataProvider.getDataSource();
  await dataSource.synchronize();

  await evaluateModuleDataScripts(dataProvider, migrations);
})();
