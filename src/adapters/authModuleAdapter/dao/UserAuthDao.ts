import {IUserAuthDao} from '../../../modules';
import {User} from '../../..';
import {DataSource, Repository} from 'typeorm';
import {UserEntity} from '../model/db/user.entity';
import {UserMapper} from '../model/mappers/UserMapper';

export class UserAuthDao implements IUserAuthDao {
  private dataSource: DataSource;
  private repository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(UserEntity);
  }
  public async findUserByPublicId(publicUserId: string): Promise<User | null> {
    return UserMapper.toDto(await this.repository.findOneBy({publicUserId}));
  }

  public async findUserByUserId(userId: number): Promise<User | null> {
    return UserMapper.toDto(await this.repository.findOneBy({userId}));
  }
}
