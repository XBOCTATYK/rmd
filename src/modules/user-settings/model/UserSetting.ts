export class UserSetting {
  id: number;
  publicUserId: number;
  type: string;
  value: string;

  constructor(id: number, publicUserId: number, type: string, value: string) {
    this.id = id;
    this.publicUserId = publicUserId;
    this.type = type;
    this.value = value;
  }
}
