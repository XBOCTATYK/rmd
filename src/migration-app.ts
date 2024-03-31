import {PinoLoggerService} from './modules/common/service/LoggerService';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {IDataSourceConfiguration} from './modules/common/common.types';
import {CommonModule} from './modules/common/common.module';
import {SchedulingModule} from './modules/scheduling/scheduling.module';
import {TelegramModule} from './modules/telegram/telegram.module';

(async function() {
  const loggerService = new PinoLoggerService();
  const configurationModule = new ConfigurationModule();
  const {configService} = configurationModule.init({env: 'local'}).exports();

  const dbConfig = configService.get<IDataSourceConfiguration>('db');
  console.log(configService.get());
  const commonModule = new CommonModule(loggerService);
  const {dataProvider} = (await commonModule.init({db: dbConfig})).exports();

  const modules = [
    commonModule,
    new SchedulingModule(loggerService, dataProvider),
    new TelegramModule(loggerService, dataProvider),
  ];

  const allEntities = [];
  const allScripts = [];
  for (const module of modules) {
    const {entities, scripts} = module.migrations();

    allEntities.push(...entities);
    allScripts.push(...scripts);
  }

  const dataSource = dataProvider.getDataSource();
  dataSource.setOptions({entities: allEntities});
  await dataSource.initialize();
  await dataSource.synchronize();

  for (const script of allScripts) {
    await script(dataProvider);
  }
})();
