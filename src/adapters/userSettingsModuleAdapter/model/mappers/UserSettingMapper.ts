import {UserSetting} from '../../../../modules/user-settings';
import {UserSettingEntity} from '../db/userSetting.entity';

export class UserSettingMapper {
  public static toDto(userSetting: UserSettingEntity): UserSetting {
    return new UserSetting(
        userSetting.id,
        userSetting.publicUserId,
        userSetting.type,
        userSetting.value
    );
  }

  public static toEntity(userSetting: UserSetting): UserSettingEntity {
    return new UserSettingEntity(
        userSetting.id,
        userSetting.publicUserId,
        userSetting.type,
        userSetting.value
    );
  }
}
