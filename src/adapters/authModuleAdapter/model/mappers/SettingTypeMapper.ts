import {SettingTypeEntity} from '../db/settingType.entity';

export class SettingTypeMapper {
  public static toDto(settingType: SettingTypeEntity): string {
    return settingType.name;
  }

  public static toEntity(settingType: string): SettingTypeEntity {
    return new SettingTypeEntity(undefined, settingType, '');
  }
}
