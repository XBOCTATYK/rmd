import {INotificationsDaoService} from '../scheduling.types';

export class NotificationService {
  private notificationDaoService: INotificationsDaoService;

  constructor(notificationDaoService: INotificationsDaoService) {
    this.notificationDaoService = notificationDaoService;
  }
}
