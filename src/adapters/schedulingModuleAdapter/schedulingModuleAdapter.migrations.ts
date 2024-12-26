import {IMigrationHolder} from '../../types/IMigrationHolder';
import {NotificationEntity} from './model/db/notification.entity';
import {SchedulerMetaEntity} from './model/db/scheduler-meta.entity';
import {TaskExtraEntity} from './model/db/task-extra.entity';
import {TaskEntity} from './model/db/task.entity';
import {TaskExtraTypeEntity} from './model/db/taskExtraType.entity';

export class SchedulingModuleAdapterMigrations implements IMigrationHolder {
  public migrations() {
    return {
      entities: [NotificationEntity, TaskEntity, TaskExtraTypeEntity, TaskExtraEntity, SchedulerMetaEntity],
      scripts: [],
    };
  }
}
