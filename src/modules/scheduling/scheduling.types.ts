import {NotificationDto, SchedulerMetaDto, TaskDto} from './model';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export interface ITaskScheduleDaoService {
    saveTask(task: TaskDto): Promise<TaskDto>;

    findTask(taskId: number): Promise<TaskDto | null>;

    getTasksByUser(userId: number): Promise<TaskDto[]>;

    getUnfinishedTasksByUser(userId: number): Promise<TaskDto[]>;

    getTasksByCurrentDate(date: Date): Promise<TaskDto[]>;

    getOutdatedTasks(): Promise<TaskDto[]>;

    deleteTask(taskId: number): Promise<void>;

    updateTaskStatus(taskId: number, status: number): Promise<void>;

    updateNotificationCount(taskId: number, count: number): Promise<void>;

    updateDueDate(taskId: number, dueDate: Date): Promise<void>;
}

export interface INotificationsDaoService {
    saveNotification(notification: NotificationDto): Promise<void>;

    findNotification(notificationId: number): Promise<NotificationDto | null>;

    findNextNotificationForTask(taskId: number): Promise<NotificationDto | null>;

    findNotificationsByTimestamp(timestamp: Date): Promise<NotificationDto[]>;

    findNotificationsSinceTimestamp(from: Date, to: Date): Promise<NotificationDto[]>;

    deleteNotification(notificationId: number): Promise<void>;

    updateNotificationAnswer(notificationId: number, answer: number): Promise<void>;
}

export interface ISchedulerMetaDaoService {
    addSchedulerMeta(schedulerMeta: SchedulerMetaDto): Promise<void>;
    getSchedulerMetaByKey(key: string): Promise<SchedulerMetaDto | null>;
}
