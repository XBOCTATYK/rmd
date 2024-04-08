export class Task {
  public id: number | undefined;
  public description: string;
  public userId: number;
  public status: number;
  public priority: number;
  public notificationsCount: number;
  public dueDate: Date;


  constructor(
      id: number | undefined,
      description: string,
      userId: number,
      status: number,
      priority: number,
      notificationsCount: number,
      dueDate: Date
  ) {
    this.id = id;
    this.description = description;
    this.userId = userId;
    this.status = status;
    this.priority = priority;
    this.notificationsCount = notificationsCount;
    this.dueDate = dueDate;
  }
}
