import {INotificationsDaoService, ISchedulerMetaDaoService, ITaskScheduleDaoService} from '../..';

export interface ISchedulingModuleAdapter {
    notificationDaoService: INotificationsDaoService,
    taskScheduleDaoService: ITaskScheduleDaoService,
    schedulerMetaDaoService: ISchedulerMetaDaoService
}
