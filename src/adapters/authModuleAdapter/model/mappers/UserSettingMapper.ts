import {UserSettingEntity} from '../db/userSetting.entity';
import {SettingTypeMapper} from './SettingTypeMapper';

export class UserSettingMapper {
  public static toDto(userSetting: UserSettingEntity): [string, string] {
    return [
      SettingTypeMapper.toDto(userSetting.settingType),
      userSetting.settingValue,
    ];
  }

  public static toEntity(userId: number | undefined, userSetting: [string, string]): UserSettingEntity {
    const [type, value] = userSetting;
    return new UserSettingEntity(
        undefined,
        userId,
        SettingTypeMapper.toEntity(type),
        value
    );
  }
}
