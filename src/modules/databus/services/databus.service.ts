import {DataBusEvent, IDataBusConnector} from '../databus.types';
import {ILoggerService} from '../../common/service/service.types';


export class DataBusService {
  private readonly topic: string;
  private dataBusConnector: IDataBusConnector;
  private logger: ILoggerService;

  constructor(dataBusConnector: IDataBusConnector, logger: ILoggerService, topic: string) {
    this.topic = topic;
    this.dataBusConnector = dataBusConnector;
    this.logger = logger;
  }

  async fireEvent<T extends Record<string, any>>(data: DataBusEvent<T>) {
    this.logger.info('firedEvent', data);
    await this.dataBusConnector.addEvent(this.topic, data);
  }

  async addListener<T extends Record<string, any>>(name: string, fn: (data: T) => unknown) {
    // @ts-ignore
    await this.dataBusConnector.addListener(name, fn);
  }
}

