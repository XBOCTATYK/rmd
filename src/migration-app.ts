import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {CommonModule} from './modules/common/common.module';
import {CommonModuleMigrations} from './modules/common/common.migrations';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';
import {TelegramModuleMigrations} from './modules/telegram/telegram.migrations';
import {evaluateModuleDataScripts, setEntitiesToDataProvider} from './lib/setEntitiesToDataProvider';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());
  const commonModule = new CommonModule(loggerService);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const modules = [
    new CommonModuleMigrations(),
    new SchedulingModuleMigrations(),
    new TelegramModuleMigrations(),
  ];

  setEntitiesToDataProvider(dataProvider, modules);
  const dataSource = await dataProvider.connect();
  await dataSource.initialize();
  await dataSource.synchronize();

  await evaluateModuleDataScripts(dataProvider, modules);
})();
