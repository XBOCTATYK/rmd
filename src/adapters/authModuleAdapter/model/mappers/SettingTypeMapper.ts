import {AuthSettingTypeEntity} from '../db/authSettingType.entity';

export class SettingTypeMapper {
  public static toDto(settingType: AuthSettingTypeEntity): string {
    return settingType.name;
  }

  public static toEntity(settingType: string): AuthSettingTypeEntity {
    return new AuthSettingTypeEntity(undefined, settingType, '');
  }
}
