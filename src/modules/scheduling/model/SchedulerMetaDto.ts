export class SchedulerMetaDto {
  constructor(
      public id: number | undefined,
      public key: string,
      public lastUpdate: Date,
      public isActive: boolean
  ) {}
}
