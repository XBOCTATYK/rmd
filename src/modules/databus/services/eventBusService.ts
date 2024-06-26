import {DataBusEvent, IEventBusAdapter} from '../databus.types';
import {ILoggerService} from '../../common/service/service.types';
import {waitUntil} from '../../../lib/wait';
import {randomUUID} from 'crypto';


export class EventBusService<T extends DataBusEvent<unknown>> {
  private readonly topic: string;
  private dataBusConnector: IEventBusAdapter;
  private logger: ILoggerService;
  private connected = false;

  constructor(dataBusConnector: IEventBusAdapter, logger: ILoggerService, topic: string) {
    this.topic = topic;
    this.dataBusConnector = dataBusConnector;
    this.logger = logger;

    this.connect().then(() => this.connected = true);
  }

  async fireEvent(data: T) {
    await waitUntil(() => this.connected);

    const metadata = {
      ...data.metadata,
      uid: randomUUID(),
      timestamp: Date.now(),
    };

    this.logger.info('firedEvent %o', {topic: this.topic, type: data.type, metadata});
    await this.dataBusConnector.addEvent(this.topic, {...data, metadata});
  }

  async addListener(name: string, fn: (event: T) => unknown) {
    await waitUntil(() => this.connected);
    await this.dataBusConnector.addListener(name, fn);
  }

  private async connect() {
    await this.dataBusConnector.addErrorHandler(async (e) => {
      this.logger.error('DataBusService', e);
      await this.dataBusConnector.addEvent(this.topic, {type: 'error', data: {details: e}});
    });
  }
}

