import {IAuthUserService} from '../../common/common.types';

export function setUserHoursListener(userService: IAuthUserService) {
  return async (event: any) => {
    if (event.type === 'set-user-hours') {
      const {publicUserId, startTime, endTime} = event.data;
      const user = await userService?.findUserByPublicId(publicUserId);

      if (!user?.userId) {
        throw new Error(`User with public id ${publicUserId} was not found!`);
      }

      await userService?.updateUser({userId: user.userId, startTime, endTime});
    }
  };
}
