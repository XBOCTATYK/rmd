import {IMigrationHolder} from '../../types/IMigrationHolder';
import {NotificationEntity} from './model/db/notification.entity';
import {TaskEntity} from './model/db/task.entity';
import {TaskExtraTypeEntity} from './model/db/taskExtraType.entity';
import {TaskExtraEntity} from './model/db/task-extra.entity';

export class SchedulingModuleAdapterMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [NotificationEntity, TaskEntity, TaskExtraTypeEntity, TaskExtraEntity],
      scripts: [],
    };
  }
}
