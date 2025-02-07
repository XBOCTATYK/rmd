import {DataSource, Repository} from 'typeorm';
import {User} from '../../..';
import {IUserAuthDao} from '../../../modules';
import {UserEntity} from '../model/db/user.entity';
import {UserMapper} from '../model/mappers/UserMapper';

export class UserAuthDao implements IUserAuthDao {
  private readonly repository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }
  public async findUserByPublicId(publicUserId: string): Promise<User | null> {
    return UserMapper.toDto(await this.repository.findOneBy({publicUserId}));
  }

  public async findUserByUserId(userId: number): Promise<User | null> {
    return UserMapper.toDto(await this.repository.findOneBy({userId}));
  }
}
