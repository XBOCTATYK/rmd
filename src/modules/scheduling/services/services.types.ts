export interface IUserSleepTimeService {
  getUserSleepTime(publicUserId: string): Promise<{startTime: Date, endTime: Date}>;
}
