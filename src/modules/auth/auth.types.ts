import {UserAuthService} from './services/UserAuthService';

export interface IAuthModuleConfig {
    secretHash: string;
}

export interface IAuthModuleExports {
    userAuthService: UserAuthService;
}
