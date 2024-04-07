import {ITaskScheduleDaoService} from '../scheduling.types';
import {Task} from '../model';

export class TaskScheduleDaoService implements ITaskScheduleDaoService {
  private readonly taskScheduleDaoServiceAdapter: ITaskScheduleDaoService;

  constructor(taskScheduleDaoServiceAdapter: ITaskScheduleDaoService) {
    this.taskScheduleDaoServiceAdapter = taskScheduleDaoServiceAdapter;
  }
  saveTask(): Promise<void> {
    return Promise.resolve();
  }

  getTask(): Promise<Task> {
    return Promise.resolve(
        new Task(
            1,
            'test',
            1,
            1,
            1,
            1,
            new Date()
        )
    );
  }

  deleteTask(): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateDueDate(): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateNotificationCount(): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateTaskStatus(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
