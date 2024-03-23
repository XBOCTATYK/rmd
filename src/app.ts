import 'reflect-metadata';
import {TelegramModule} from './modules/telegram/telegram.module';
import {CommonModule} from './modules/common/common.module';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {ISchedulingModuleConfig, SchedulingModule} from './modules/scheduling/scheduling.module';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());
  const commonModule = new CommonModule(loggerService);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const schedulingModule = new SchedulingModule(loggerService, dataProvider);
  schedulingModule.init(configService.get<ISchedulingModuleConfig>('scheduling')).exports();

  const tgApp = new TelegramModule(loggerService, dataProvider);

  await tgApp.init({token: 'token'});
})();


