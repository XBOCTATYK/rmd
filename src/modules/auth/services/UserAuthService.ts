import {IAuthUserService} from '../../common/common.types';

export class UserAuthService implements IAuthUserService {
  private readonly clientSecretHash: string;
  private readonly allowedUsers: string[];

  constructor(clientSecretHash: string, allowedUsers: string[] = []) {
    this.clientSecretHash = clientSecretHash;
    this.allowedUsers = allowedUsers;
  }

  public async checkPermission(permission: string, userId: string): Promise<boolean> {
    return this.allowedUsers.includes(userId);
  }
}
