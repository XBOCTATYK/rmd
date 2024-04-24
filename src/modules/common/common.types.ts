import {DataSource} from 'typeorm';
import {User} from '../auth';
import {NotificationDto, Task} from '../scheduling';

export interface IDataSource {
    openSession(): void
    closeSession(): void
}

export interface IDataProvider {
    getUninitializedDataSource(): DataSource
    getDataSource(): DataSource
    connect(): Promise<DataSource>
    disconnect(): Promise<void>
}

export interface ICommonModuleConfig {
    db: IDataSourceConfiguration
}

export interface IDataSourceConfiguration {
    host: string
    port: number
    username: string
    password: string
    database: string,
    schema: string,
    logging: boolean
}

export interface ICommonModuleExports {
    dataProvider: IDataProvider
}

export interface IAuthUserService {
    checkPermission(permission: string, userId: string): Promise<boolean>
    findUserByPublicId(publicUserId: string): Promise<User | null>
    findUserByUserId(userId: number): Promise<User>
    updateUser(user: User): Promise<void>
    updateUserSettings(userId: number, settings: Map<string, any>): Promise<void>
}

export interface ITaskScheduleService {
    saveTask(task: Task): Promise<Task>
    getTasksByUser(userId: number): Promise<Task[]>
    getTasksByCurrentDate(date: Date): Promise<Task[]>
    findTask(taskId: number): Promise<Task | null>
    deleteTask(taskId: number): Promise<void>
    updateTaskStatus(taskId: number, status: number): Promise<void>
    updateDueDate(taskId: number, dueDate: Date): Promise<void>
    updateNotificationCount(taskId: number, count: number): Promise<void>
}

export interface INotificationsService {
    saveNotification(notification: NotificationDto): Promise<void>
    findNextNotificationForTask(taskId: number): Promise<NotificationDto>
    findNotificationsByTimestamp(timestamp: Date): Promise<NotificationDto[]>
    deleteNotification(notificationId: number): Promise<void>
    updateNotificationAnswer(notificationId: number, answer: number): Promise<void>
}
