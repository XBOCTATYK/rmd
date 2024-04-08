import {ISchedulingModuleAdapter} from '../../types/adapters/ISchedulingModuleAdapter';
import {INotificationsDaoService, ITaskScheduleDaoService} from '../../modules';
import {IDataProvider} from '../../modules/common/common.types';
import {NotificationsDaoService} from './dao/NotificationsDaoService';
import {TaskScheduleDaoService} from './dao/TaskSchedulingDao';

export class SchedulingModuleAdapter implements ISchedulingModuleAdapter {
  private dataProvider: IDataProvider;
  constructor(dataProvider: IDataProvider) {
    this.dataProvider = dataProvider;

    const dataSource = this.dataProvider.getDataSource();
    this.notificationDaoService = new NotificationsDaoService(dataSource);
    this.taskScheduleDaoService = new TaskScheduleDaoService(dataSource);
  }

  notificationDaoService: INotificationsDaoService;
  taskScheduleDaoService: ITaskScheduleDaoService;
}
