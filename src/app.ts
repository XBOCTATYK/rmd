import 'reflect-metadata';
import {TelegramModule} from './modules/telegram/telegram.module';
import {CommonModule} from './modules/common/common.module';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {ISchedulingModuleConfig, SchedulingModule} from './modules/scheduling/scheduling.module';
import {setEntitiesToDataProvider} from './lib/setEntitiesToDataProvider';
import {TelegramModuleMigrations} from './modules/telegram/telegram.migrations';
import {CommonModuleMigrations} from './modules/common/common.migrations';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';

const moduleMigrationsList = [
  new TelegramModuleMigrations(),
  new CommonModuleMigrations(),
  new SchedulingModuleMigrations(),
];

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());
  const commonModule = new CommonModule(loggerService);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();
  setEntitiesToDataProvider(dataProvider, moduleMigrationsList);
  const dataSource = await dataProvider.connect();

  const schedulingModule = new SchedulingModule(loggerService, dataSource);
  schedulingModule.init(configService.get<ISchedulingModuleConfig>('scheduling')).exports();

  const tgApp = new TelegramModule(loggerService, dataSource);
  await tgApp.init({token: 'token'});
})();


