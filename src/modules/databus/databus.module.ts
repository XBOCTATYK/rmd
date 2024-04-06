import {IAppModule} from '../../types/IAppModule';
import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {IDataBusAdapter} from './databus.types';
import {EventEmitterDataBusAdapter} from '../common/connectors/EventEmitterDataBusAdapter';
import {DataBusFactoryService} from './services/dataBusFactoryService';

export class DataBusModule implements IAppModule<any, any> {
  private dataProvider: IDataProvider;
  private readonly loggerService: ILoggerService;
  private readonly dataBusConnector: IDataBusAdapter;
  private readonly dataBusFactory: DataBusFactoryService;
  private config = {};

  constructor(dataProvider: IDataProvider, loggerService: ILoggerService) {
    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
    this.dataBusConnector = new EventEmitterDataBusAdapter({});
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
