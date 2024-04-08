import {ITaskScheduleService} from '../../common/common.types';
import {ITaskScheduleDaoService} from '../scheduling.types';
import {ILoggerService} from '../../common/service/service.types';
import {Task} from '../model';

export class TaskScheduleService implements ITaskScheduleService {
  private taskScheduleService: ITaskScheduleDaoService;
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService, taskScheduleService: ITaskScheduleDaoService) {
    this.loggerService = loggerService;
    this.taskScheduleService = taskScheduleService;
  }

  public async saveTask(task: Task): Promise<void> {
    this.loggerService.info('Saving task: ' + task.id);
    await this.taskScheduleService.saveTask(task);
  }

  async deleteTask(taskId: number): Promise<void> {
    this.loggerService.info('Deleting task: ' + taskId);
    await this.taskScheduleService.deleteTask(taskId);
  }

  async findTask(taskId: number): Promise<Task | null> {
    this.loggerService.info('Finding task: ' + taskId);
    return await this.taskScheduleService.findTask(taskId);
  }

  async getTasksByCurrentDate(date: Date): Promise<Task[]> {
    this.loggerService.info('Getting tasks by date: ' + date);
    return await this.taskScheduleService.getTasksByCurrentDate(date);
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    this.loggerService.info('Getting tasks by user: ' + userId);
    return await this.taskScheduleService.getTasksByUser(userId);
  }

  async updateDueDate(taskId: number, dueDate: Date): Promise<void> {
    this.loggerService.info('Updating due date: ' + taskId + ' to ' + dueDate);
    await this.taskScheduleService.updateDueDate(taskId, dueDate);
  }

  async updateNotificationCount(taskId: number, count: number): Promise<void> {
    this.loggerService.info('Updating notification count: ' + taskId + ' to ' + count);
    await this.taskScheduleService.updateNotificationCount(taskId, count);
  }

  async updateTaskStatus(taskId: number, status: number): Promise<void> {
    this.loggerService.info('Updating task status: ' + taskId + ' to ' + status);
    await this.taskScheduleService.updateTaskStatus(taskId, status);
  }
}
