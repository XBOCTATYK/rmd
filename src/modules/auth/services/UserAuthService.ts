import {IAuthUserService} from '../../common/common.types';
import {User} from '../model';
import {IUserAuthDao} from '../auth.types';

export class UserAuthService implements IAuthUserService {
  private readonly clientSecretHash: string;
  private readonly allowedUsers: string[];
  private userAuthDao: IUserAuthDao;

  constructor(userAuthDao: IUserAuthDao, clientSecretHash: string, allowedUsers: string[] = []) {
    this.userAuthDao = userAuthDao;
    this.clientSecretHash = clientSecretHash;
    this.allowedUsers = allowedUsers;
  }

  public async checkPermission(permission: string, userId: string): Promise<boolean> {
    return this.allowedUsers.includes(userId);
  }

  public async findUserByPublicId(publicUserId: string): Promise<User | null> {
    return this.userAuthDao.findUserByPublicId(publicUserId);
  }

  public async updateUser(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findUserByUserId(userId: number): Promise<User> {
    const user = await this.userAuthDao.findUserByUserId(userId);

    if (user === null) {
      throw new Error(`User not ${userId} found`);
    }

    return user;
  }
}
