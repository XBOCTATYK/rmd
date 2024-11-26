import {DataSource, Repository} from 'typeorm';
import {UserSettingEntity} from '../model/db/userSetting.entity';

export class UserSettingsDao {
  private dataSource: DataSource;
  private userSettingRepository: Repository<UserSettingEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userSettingRepository = this.dataSource.getRepository(UserSettingEntity);
  }

  public async findUserSettingsByPublicUserId(publicUserId: number): Promise<any> {
    return this.userSettingRepository.findOneBy({publicUserId});
  }

  public async updateUserSettings(publicUserId: number, type: string, value: string ) {
    await this.userSettingRepository.update({publicUserId, type}, {value});
  }
}
