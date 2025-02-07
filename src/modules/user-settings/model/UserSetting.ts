export class UserSetting {
  constructor(
    public id: number,
    public publicUserId: number,
    public type: string,
    public value: string
  ) {}
}
