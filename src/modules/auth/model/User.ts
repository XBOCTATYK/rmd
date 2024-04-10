export class User {
  public userId: number | undefined;
  public publicUserId: number;
  public createdAt: Date;
  public settings: Map<string, string>;

  constructor(userId: number | undefined, publicUserId: number, createdAt: Date, settings: Map<string, string>) {
    this.userId = userId;
    this.publicUserId = publicUserId;
    this.createdAt = createdAt;
    this.settings = settings;
  }
}
