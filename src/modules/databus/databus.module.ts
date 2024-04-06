import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {IDataBusModuleConfig, IDataBusModuleExports, IEventBusAdapter} from './databus.types';
import {DataBusFactoryService} from './services/dataBusFactoryService';
import {AbstractAuthModule} from '../common/lib/AbstractAuthModule';

export class DataBusModule extends AbstractAuthModule<IDataBusModuleConfig, IDataBusModuleExports> {
  private dataProvider: IDataProvider;
  private readonly loggerService: ILoggerService;
  private readonly dataBusConnector: IEventBusAdapter;
  private dataBusFactory?: DataBusFactoryService;

  constructor(dataProvider: IDataProvider, loggerService: ILoggerService, dataBusConnector: IEventBusAdapter) {
    super('databus');

    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
    this.dataBusConnector = dataBusConnector;
  }
  protected buildExports() {
    return {
      dataBusFactory: this.dataBusFactory!,
    };
  }

  protected async initModule(config: Record<string, any>) {
    this.dataBusFactory = new DataBusFactoryService(this.dataBusConnector, this.loggerService);

    return this;
  }
}
