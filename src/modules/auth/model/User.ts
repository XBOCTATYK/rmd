export class User {
  public userId: number | undefined;
  public publicUserId: string;
  public createdAt: Date;
  public settings: Map<string, string>;

  constructor(userId: number | undefined, publicUserId: string, createdAt: Date, settings: Map<string, string> = new Map()) {
    this.userId = userId;
    this.publicUserId = publicUserId;
    this.createdAt = createdAt;
    this.settings = settings;
  }
}
