import 'reflect-metadata';
import {AuthModuleAdapter} from './adapters/authModuleAdapter/authModule.adapter';
import {AuthModuleAdapterMigrations} from './adapters/authModuleAdapter/authModuleAdapter.migrations';
import {SchedulingModuleAdapter} from './adapters/schedulingModuleAdapter/schedulingModule.adapter';
import {SchedulingModuleAdapterMigrations} from './adapters/schedulingModuleAdapter/schedulingModuleAdapter.migrations';
import {UserSettingsAdapterMigrations} from './adapters/userSettingsModuleAdapter/userSettingsAdapter.migrations';
import {UserSettingsModuleAdapter} from './adapters/userSettingsModuleAdapter/userSettingsModule.adapter';
import {ISchedulingModuleConfig} from './modules';
import {AuthModule} from './modules/auth/auth.module';
import {CommonModule} from './modules/common/common.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {NodeEmitterEventBusAdapter} from './modules/common/connectors/NodeEmitterEventBusAdapter';
import {SchedulingEvents} from './modules/common/databus/schedulingMessaging.types';
import {PinoLoggerService} from './modules/common/service/LoggerService';
import {RedisDataSource} from './modules/common/service/sources/RedisDataSource';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {DataBusModule} from './modules/databus/databus.module';
import {SchedulingModule} from './modules/scheduling/scheduling.module';
import {SchedulingModuleMigrations} from './modules/scheduling/schedulingModuleMigrations';
import {TelegramModule} from './modules/telegram/telegram.module';
import {ITelegramModuleConfig} from './modules/telegram/telegram.types';
import {UserSettingsModule} from './modules/user-settings/user-settings.module';

const moduleMigrationsList = [
  new SchedulingModuleAdapterMigrations(),
  new AuthModuleAdapterMigrations(),
  new SchedulingModuleMigrations(),
  new UserSettingsAdapterMigrations(),
];

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());

  const commonModule = new CommonModule(loggerService, moduleMigrationsList);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();
  const cacheProvider = new RedisDataSource();

  const dataBusModule = new DataBusModule(dataProvider, loggerService, new NodeEmitterEventBusAdapter());
  await dataBusModule.init({});
  const {dataBusFactory} = dataBusModule.exports();

  const taskTopic = dataBusFactory.getDataBusService<SchedulingEvents>('scheduling-events');
  const authModule = new AuthModule(dataProvider, loggerService, new AuthModuleAdapter(dataProvider));
  await authModule.init(configService.get('auth'));
  const {userAuthService} = authModule.exports();

  const userSettingsModule = new UserSettingsModule(
      new UserSettingsModuleAdapter({dataProvider, cacheProvider}),
      loggerService
  );

  await userSettingsModule.init();
  const {userSettingsDataService} = userSettingsModule.exports();

  const schedulingModule = new SchedulingModule(
      loggerService,
      taskTopic,
      new SchedulingModuleAdapter(dataProvider),
      userAuthService,
      userSettingsDataService
  );
  schedulingModule.init(configService.get<ISchedulingModuleConfig>('scheduling'));


  const tgApp = new TelegramModule(loggerService, taskTopic, userAuthService);
  await tgApp.init(configService.get<ITelegramModuleConfig>('bot'));
})();


