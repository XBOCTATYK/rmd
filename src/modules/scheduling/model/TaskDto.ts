export class TaskDto {
  constructor(
      public id: number | undefined,
      public description: string,
      public userId: number,
      public status: number,
      public priority: number,
      public notificationsCount: number,
      public dueDate: Date
  ) {}
}
