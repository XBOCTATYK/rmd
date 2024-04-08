import {INotificationsDaoService, ITaskScheduleDaoService} from '../..';

export interface ISchedulingModuleAdapter {
    notificationDaoService: INotificationsDaoService,
    taskScheduleDaoService: ITaskScheduleDaoService
}
