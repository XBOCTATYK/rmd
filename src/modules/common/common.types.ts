import {DataSource} from 'typeorm';
import {Notification, Task} from '../scheduling';

export interface IDataSource {
    openSession(): void
    closeSession(): void
}

export interface IDataProvider {
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
}

export interface ITaskScheduleService {
    saveTask(task: Task): Promise<void>
    getTasksByUser(userId: number): Promise<Task[]>
    getTasksByCurrentDate(date: Date): Promise<Task[]>
    findTask(taskId: number): Promise<Task | null>
    deleteTask(taskId: number): Promise<void>
    updateTaskStatus(taskId: number, status: number): Promise<void>
    updateDueDate(taskId: number, dueDate: Date): Promise<void>
    updateNotificationCount(taskId: number, count: number): Promise<void>
}

export interface INotificationsService {
    saveNotification(notification: Notification): Promise<void>
    findNextNotificationForTask(taskId: number): Promise<Notification>
    deleteNotification(notificationId: number): Promise<void>
    updateNotificationAnswer(notificationId: number, answer: number): Promise<void>
}
