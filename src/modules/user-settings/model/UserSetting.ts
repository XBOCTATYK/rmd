export class UserSetting {
  constructor(
    public id: number,
    public publicUserId: string,
    public type: string,
    public value: string
  ) {}
}
