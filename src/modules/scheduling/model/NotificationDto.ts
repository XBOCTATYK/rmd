export class NotificationDto {
  constructor(
    public id: number | undefined,
    public timestamp: Date,
    public answer: number,
    public taskId: number
  ) {}
}
