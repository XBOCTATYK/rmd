import {IAuthUserService} from '../../common/common.types';
import {IUserAuthDao} from '../auth.types';
import {User} from '../model';

export class UserAuthService implements IAuthUserService {
  constructor(
    private readonly userAuthDao: IUserAuthDao,
    private readonly clientSecretHash: string,
    private readonly allowedUsers: string[] = []
  ) {}

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

  public updateUserSettings(userId: number, settings: Map<string, any>): Promise<void> {
    return Promise.resolve(undefined);
  }
}
