import {DataSource, LessThan, Repository} from 'typeorm';
import {ITaskScheduleDaoService, TaskDto} from '../../..';
import {ETaskStatus} from '../../../modules/scheduling/model/const/ETaskStatus';
import {TaskEntity} from '../model/db/task.entity';
import {TaskMapper} from '../model/mappers/TaskMapper';

export class TaskScheduleDaoService implements ITaskScheduleDaoService {
  private dataSource: DataSource;
  private repository: Repository<TaskEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(TaskEntity);
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.repository.delete(taskId);
  }

  async findTask(taskId: number): Promise<TaskDto | null> {
    const taskEntity = await this.repository.findOne({where: {id: taskId}});
    if (!taskEntity) {
      return null;
    }

    return TaskMapper.toDto(taskEntity);
  }

  async getTasksByCurrentDate(date: Date): Promise<TaskDto[]> {
    const taskEntityList = await this.repository.find({where: {dueDate: date}});
    return taskEntityList.map((taskEntity) => TaskMapper.toDto(taskEntity));
  }

  async getTasksByUser(userId: number): Promise<TaskDto[]> {
    const taskEntityList = await this.repository.find({where: {userId}});
    return taskEntityList.map((taskEntity) => TaskMapper.toDto(taskEntity));
  }

  async getUnfinishedTasksByUser(userId: number): Promise<TaskDto[]> {
    const taskEntityList = await this.repository.find({where: {userId, status: ETaskStatus.IN_PROGRESS}});
    return taskEntityList.map((taskEntity) => TaskMapper.toDto(taskEntity));
  }

  async getOutdatedTasks(): Promise<TaskDto[]> {
    const taskEntityList = await this.repository.find({where: {status: ETaskStatus.IN_PROGRESS, dueDate: LessThan(new Date())}});
    return taskEntityList.map((taskEntity) => TaskMapper.toDto(taskEntity));
  }

  async saveTask(task: TaskDto): Promise<TaskDto> {
    return TaskMapper.toDto(
        await this.repository.save(TaskMapper.toEntity(task))
    );
  }

  async updateDueDate(taskId: number, dueDate: Date): Promise<void> {
    await this.repository.update(taskId, {dueDate});
  }

  async updateNotificationCount(taskId: number, count: number): Promise<void> {
    await this.repository.update(taskId, {notificationsCount: count});
  }

  async updateTaskStatus(taskId: number, status: number): Promise<void> {
    await this.repository.update(taskId, {status});
  }
}
