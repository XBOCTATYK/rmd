import {IAppModule} from '../../types/IAppModule';
import {IDataProvider} from '../common/common.types';
import {ILoggerService} from '../common/service/service.types';
import {IDataBusConnector} from './databus.types';
import {EventEmitterDataBusConnector} from '../common/connectors/EventEmitterDataBusConnector';
import {DataBusFactoryService} from './services/dataBusFactoryService';

export class DataBusModule implements IAppModule<any, any> {
  private dataProvider: IDataProvider;
  private readonly loggerService: ILoggerService;
  private readonly dataBusConnector: IDataBusConnector;
  private readonly dataBusFactory: DataBusFactoryService;
  constructor(dataProvider: IDataProvider, loggerService: ILoggerService) {
    this.dataProvider = dataProvider;
    this.loggerService = loggerService;
    this.dataBusConnector = new EventEmitterDataBusConnector();
    this.dataBusFactory = new DataBusFactoryService(this.dataBusConnector, this.loggerService);
  }
  exports(): { dataBusFactory: DataBusFactoryService } {
    return {dataBusFactory: this.dataBusFactory};
  }

  init(config: any): this | Promise<this> {
    return this;
  }
}
