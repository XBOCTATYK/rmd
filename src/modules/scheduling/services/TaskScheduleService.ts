import {DataSource} from 'typeorm';
import {ITaskScheduleService} from '../../common/common.types';

export class TaskScheduleService implements ITaskScheduleService {
  private readonly dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }


  public async saveTask() {

  }
}
