import {createClient, RedisClientType} from 'redis';

export class RedisDataSource {
  private readonly client: RedisClientType;
  constructor(configuration?: any) {
    this.client = createClient();

    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  async connect() {
    await this.client.connect();
    return this.client;
  }
}
