import {UserAuthSettingEntity} from '../db/userAuthSetting.entity';
import {SettingTypeMapper} from './SettingTypeMapper';

export class UserSettingMapper {
  public static toDto(userSetting: UserAuthSettingEntity): [string, string] {
    return [
      SettingTypeMapper.toDto(userSetting.settingType),
      userSetting.settingValue,
    ];
  }

  public static toEntity(userId: number | undefined, userSetting: [string, string]): UserAuthSettingEntity {
    const [type, value] = userSetting;
    return new UserAuthSettingEntity(
        undefined,
        userId,
        SettingTypeMapper.toEntity(type),
        value
    );
  }
}
