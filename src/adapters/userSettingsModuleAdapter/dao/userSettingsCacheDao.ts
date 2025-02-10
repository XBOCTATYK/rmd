import {RedisClientType} from 'redis';
import {IUserCacheDaoService} from '../../..';
import {RedisDataSource} from '../../../modules/common/service/sources/RedisDataSource';

export class UserSettingsCacheDao implements IUserCacheDaoService {
  private cacheClient: RedisClientType | null = null;

  constructor(private readonly cacheDataSource: RedisDataSource) {}

  async findUserSettingsByPublicUserId(publicUserId: string): Promise<Record<string, string>> {
    await this.initClient();
    return this.cacheClient!.hGetAll(`userSettings:${publicUserId}`);
  }

  async addUserSettings(publicUserId: string, userSettings: Record<string, string>) {
    await this.initClient();
    await this.cacheClient!.hSet(`userSettings:${publicUserId}`, userSettings);
  }

  async bulkAddUserSettings(bulk: { publicUserId: string, userSettings: Record<string, string> }[]) {
    await this.initClient();
    const multiQuery = this.cacheClient!.multi();

    bulk.forEach(({publicUserId, userSettings}) => {
      multiQuery.hSet(`userSettings:${publicUserId}`, userSettings);
    });

    await multiQuery.exec();
  }

  private async initClient() {
    if (!this.cacheClient) {
      this.cacheClient = await this.cacheDataSource.connect();
    }
  }
}
