export class NotificationDto {
  id: number | undefined;
  timestamp: Date;
  answer: number;
  taskId: number;

  constructor(id: number | undefined, timestamp: Date, answer: number, taskId: number) {
    this.id = id;
    this.timestamp = timestamp;
    this.answer = answer;
    this.taskId = taskId;
  }
}
