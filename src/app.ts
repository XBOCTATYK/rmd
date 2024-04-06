import 'reflect-metadata';
import {TelegramModule} from './modules/telegram/telegram.module';
import {CommonModule} from './modules/common/common.module';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {SchedulingModule} from './modules/scheduling/scheduling.module';
import {setEntitiesToDataProvider} from './lib/setEntitiesToDataProvider';
import {TelegramModuleMigrations} from './modules/telegram/telegram.migrations';
import {CommonModuleMigrations} from './modules/common/common.migrations';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';
import {DataBusModule} from './modules/databus/databus.module';
import {SchedulingEvents} from './modules/common/databus/schedulingMessaging.types';
import {ITelegramModuleConfig} from './modules/telegram/telegram.types';
import {ISchedulingModuleConfig} from './modules/scheduling/scheduling.types';
import {NodeEmitterEventBusAdapter} from './modules/common/connectors/NodeEmitterEventBusAdapter';
import {AuthModule} from './modules/auth/auth.module';

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

  const dataBusModule = new DataBusModule(dataProvider, loggerService, new NodeEmitterEventBusAdapter());
  await dataBusModule.init({});
  const {dataBusFactory} = dataBusModule.exports();

  const taskTopic = dataBusFactory.getDataBusService<SchedulingEvents>('scheduling-events');

  const schedulingModule = new SchedulingModule(loggerService, taskTopic);
  schedulingModule.init(configService.get<ISchedulingModuleConfig>('scheduling'));

  const authModule = new AuthModule(dataProvider, loggerService);
  await authModule.init(configService.get('auth'));
  const {userAuthService} = authModule.exports();

  const tgApp = new TelegramModule(loggerService, taskTopic, userAuthService);
  await tgApp.init(configService.get<ITelegramModuleConfig>('bot'));
})();


