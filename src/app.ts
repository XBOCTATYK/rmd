import 'reflect-metadata';
import {TelegramModule} from './modules/telegram/telegram.module';
import {CommonModule} from './modules/common/common.module';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());
  const commonModule = new CommonModule(loggerService);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const tgApp = new TelegramModule(loggerService, dataProvider);

  await tgApp.init({token: 'token'});
})();


