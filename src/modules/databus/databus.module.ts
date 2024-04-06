import {IAppModule} from '../../types/IAppModule';
import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {IEventBusAdapter} from './databus.types';
import {NodeEmitterEventBusAdapter} from '../common/connectors/NodeEmitterEventBusAdapter';
import {DataBusFactoryService} from './services/dataBusFactoryService';

export class DataBusModule implements IAppModule<any, any> {
  private dataProvider: IDataProvider;
  private readonly loggerService: ILoggerService;
  private readonly dataBusConnector: IEventBusAdapter;
  private readonly dataBusFactory: DataBusFactoryService;
  private config = {};

  constructor(dataProvider: IDataProvider, loggerService: ILoggerService) {
    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
    this.dataBusConnector = new NodeEmitterEventBusAdapter({});
    this.dataBusFactory = new DataBusFactoryService(this.dataBusConnector, this.loggerService);
  }
  exports(): { dataBusFactory: DataBusFactoryService } {
    return {dataBusFactory: this.dataBusFactory};
  }

  init(config: Record<string, any>): this | Promise<this> {
    this.config = config;
    return this;
  }
}
