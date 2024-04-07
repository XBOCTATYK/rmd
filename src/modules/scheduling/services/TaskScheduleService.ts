import {ITaskScheduleService} from '../../common/common.types';
import {ITaskScheduleDaoService} from '../scheduling.types';

export class TaskScheduleService implements ITaskScheduleService {
  private taskScheduleService: ITaskScheduleDaoService;

  constructor(taskScheduleService: ITaskScheduleDaoService) {
    this.taskScheduleService = taskScheduleService;
  }


  public async saveTask() {

  }
}
