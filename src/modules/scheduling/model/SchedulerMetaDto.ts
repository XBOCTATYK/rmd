export class SchedulerMetaDto {
  id: number | undefined;
  key: string;
  lastUpdate: Date;
  isActive: boolean;

  constructor(
      id: number | undefined,
      key: string,
      lastUpdate: Date,
      isActive: boolean
  ) {
    this.id = id;
    this.key = key;
    this.lastUpdate = lastUpdate;
    this.isActive = isActive;
  }
}
