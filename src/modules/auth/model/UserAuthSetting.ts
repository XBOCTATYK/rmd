export class UserAuthSetting {
  constructor(
      public id: number | undefined,
      public userId: number,
      public type: string,
      public value: string
  ) {}
}
