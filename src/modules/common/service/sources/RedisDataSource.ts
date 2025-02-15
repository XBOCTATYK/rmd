import {createClient, RedisClientType} from 'redis';
import {IDataProvider} from '../../common.types';

export class RedisDataSource implements IDataProvider<RedisClientType> {
  private readonly client: RedisClientType;
  constructor(configuration?: any) {
    this.client = createClient();

    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  async connect() {
    await this.client.connect();
    return this.client;
  }

  async disconnect(): Promise<void> {
    this.client.disconnect();
  }

  public getDataSource(): RedisClientType {
    return this.client;
  }

  public getUninitializedDataSource(): RedisClientType {
    return this.client;
  }
}
