import {NotificationDto} from '../../scheduling';

export class NotificationAnswer {
  public readonly notificationId: NotificationDto['id'];
  public readonly answer: NotificationDto['answer'];

  constructor(notificationId: number, answer: number) {
    this.notificationId = notificationId;
    this.answer = answer;
  }
}
