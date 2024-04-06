import {ILoggerService} from '../../common/service/service.types';
import {DataBusService} from './databus.service';
import {IDataBusAdapter} from '../databus.types';

export class DataBusFactoryService {
  private readonly loggerService: ILoggerService;
  private readonly dataConnector: IDataBusAdapter;

  constructor(dataBusConnector: IDataBusAdapter, loggerService: ILoggerService) {
    this.dataConnector = dataBusConnector;
    this.loggerService = loggerService;
  }

  getDataBusService(topic: string) {
    return new DataBusService(this.dataConnector, this.loggerService, topic);
  }
}
