import {UserAuthService} from './services/UserAuthService';
import {User} from './model';

export interface IAuthModuleConfig {
    secretHash: string
    allowedUsers: string[]
}

export interface IAuthModuleExports {
    userAuthService: UserAuthService;
}

export interface IUserAuthDao {
    findUserByPublicId(publicUserId: string): Promise<User | null>;
    findUserByUserId(userId: number): Promise<User | null>;
}
