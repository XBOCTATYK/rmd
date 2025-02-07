import {ITaskScheduleService} from '../../common/common.types';
import {ILoggerService} from '../../common/service/service.types';
import {TaskDto} from '../model';
import {ITaskScheduleDaoService} from '../scheduling.types';

export class TaskScheduleService implements ITaskScheduleService {
  constructor(
    private readonly loggerService: ILoggerService,
    private readonly taskScheduleDaoService: ITaskScheduleDaoService
  ) {}

  public async saveTask(task: TaskDto): Promise<TaskDto> {
    this.loggerService.info('Saving task: ' + task.id);
    return await this.taskScheduleDaoService.saveTask(task);
  }

  async deleteTask(taskId: number): Promise<void> {
    this.loggerService.info('Deleting task: ' + taskId);
    await this.taskScheduleDaoService.deleteTask(taskId);
  }

  async findTask(taskId: number): Promise<TaskDto | null> {
    this.loggerService.info('Finding task: ' + taskId);
    return await this.taskScheduleDaoService.findTask(taskId);
  }

  async getTasksByCurrentDate(date: Date): Promise<TaskDto[]> {
    this.loggerService.info('Getting tasks by date: ' + date);
    return await this.taskScheduleDaoService.getTasksByCurrentDate(date);
  }

  async getTasksByUser(userId: number): Promise<TaskDto[]> {
    this.loggerService.info('Getting tasks by user: ' + userId);
    return await this.taskScheduleDaoService.getUnfinishedTasksByUser(userId);
  }

  async getOutdatedTasks(): Promise<TaskDto[]> {
    this.loggerService.info('Getting outdated tasks');
    return await this.taskScheduleDaoService.getOutdatedTasks();
  }

  async updateDueDate(taskId: number, dueDate: Date): Promise<void> {
    this.loggerService.info('Updating due date: ' + taskId + ' to ' + dueDate);
    await this.taskScheduleDaoService.updateDueDate(taskId, dueDate);
  }

  async updateNotificationCount(taskId: number, count: number): Promise<void> {
    this.loggerService.info('Updating notification count: ' + taskId + ' to ' + count);
    await this.taskScheduleDaoService.updateNotificationCount(taskId, count);
  }

  async updateTaskStatus(taskId: number, status: number): Promise<void> {
    this.loggerService.info('Updating task status: ' + taskId + ' to ' + status);
    await this.taskScheduleDaoService.updateTaskStatus(taskId, status);
  }
}
