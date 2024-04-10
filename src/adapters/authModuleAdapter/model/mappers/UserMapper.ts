import {UserEntity} from '../db/user.entity';
import {User} from '../../../..';
import {UserSettingMapper} from './UserSettingMapper';

export class UserMapper {
  public static toEntity(user: User): UserEntity {
    return new UserEntity(
        user.userId,
        user.publicUserId,
        user.createdAt,
        Array.from(user.settings.entries())
            .map((setting) => UserSettingMapper.toEntity(user.userId, setting))
    );
  }

  public static toDto(user: UserEntity): User {
    return {
      userId: user.userId,
      publicUserId: user.publicUserId,
      createdAt: user.createdAt,
      settings: new Map(
          user.settings.map((setting) => UserSettingMapper.toDto(setting))
      ),
    };
  }
}
