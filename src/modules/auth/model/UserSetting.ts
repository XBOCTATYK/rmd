export class UserSetting {
  id: number | undefined;
  userId: number;
  type: string;
  value: string;

  constructor(id: number | undefined, userId: number, type: string, value: string) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.value = value;
  }
}
