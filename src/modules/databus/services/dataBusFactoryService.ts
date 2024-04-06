import {ILoggerService} from '../../common/service/service.types';
import {EventBusService} from './eventBusService';
import {DataBusEvent, IEventBusAdapter} from '../databus.types';

export class DataBusFactoryService {
  private readonly loggerService: ILoggerService;
  private readonly dataConnector: IEventBusAdapter;

  constructor(dataBusConnector: IEventBusAdapter, loggerService: ILoggerService) {
    this.dataConnector = dataBusConnector;
    this.loggerService = loggerService;
  }

  getDataBusService<T extends DataBusEvent<unknown>>(topic: string) {
    return new EventBusService<T>(this.dataConnector, this.loggerService, topic);
  }
}
