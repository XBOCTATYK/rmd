import {ITaskScheduleDaoService, Task} from '../../..';

export class TaskScheduleDao implements ITaskScheduleDaoService {
  deleteTask(taskId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getTask(taskId: number): Promise<Task> {
    return new Task(
        taskId,
        'test',
        1,
        1,
        1,
        1,
        new Date()
    );
  }

  getTasksByCurrentDate(date: Date): Promise<Task[]> {
    return Promise.resolve([]);
  }

  getTasksByUser(userId: number): Promise<Task[]> {
    return Promise.resolve([]);
  }

  saveTask(task: Task): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateDueDate(taskId: number, dueDate: Date): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateNotificationCount(taskId: number, count: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateTaskStatus(taskId: number, status: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}
