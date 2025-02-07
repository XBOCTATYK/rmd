export class User {
  constructor(
      public userId: number | undefined,
      public publicUserId: string,
      public createdAt: Date,
      public settings: Map<string, string> = new Map()
  ) {}
}
