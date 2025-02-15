import {DataSource, Repository} from 'typeorm';
import {IUserSettingsDaoService, UserSetting} from '../../..';
import {UserSettingEntity} from '../model/db/userSetting.entity';
import {UserSettingMapper} from '../model/mappers/UserSettingMapper';

export class UserSettingsDao implements IUserSettingsDaoService {
  private dataSource: DataSource;
  private userSettingRepository: Repository<UserSettingEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userSettingRepository = this.dataSource.getRepository(UserSettingEntity);
  }

  public async findUserSettingsByPublicUserId(publicUserId: string): Promise<UserSetting[]> {
    console.log('publicUserId', publicUserId);
    const entitiesList = await this.userSettingRepository.findBy({publicUserId});
    return entitiesList.map(UserSettingMapper.toDto);
  }

  public async updateUserSettings(publicUserId: string, update: Record<string, string>) {
    await this.userSettingRepository.update({publicUserId}, update);
  }
}
