import {UserAuthService} from './services/UserAuthService';

export interface IAuthModuleConfig {
    secretHash: string
    allowedUsers: string[]
}

export interface IAuthModuleExports {
    userAuthService: UserAuthService;
}
