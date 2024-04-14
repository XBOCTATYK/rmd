import {NotificationDto, Task} from './model';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export interface ITaskScheduleDaoService {
    saveTask(task: Task): Promise<Task>;

    findTask(taskId: number): Promise<Task | null>;

    getTasksByUser(userId: number): Promise<Task[]>;

    getTasksByCurrentDate(date: Date): Promise<Task[]>;

    deleteTask(taskId: number): Promise<void>;

    updateTaskStatus(taskId: number, status: number): Promise<void>;

    updateNotificationCount(taskId: number, count: number): Promise<void>;

    updateDueDate(taskId: number, dueDate: Date): Promise<void>;
}

export interface INotificationsDaoService {
    saveNotification(notification: NotificationDto): Promise<void>;

    findNextNotificationForTask(taskId: number): Promise<NotificationDto | null>;

    findNotificationsByTimestamp(timestamp: Date): Promise<NotificationDto[]>;

    deleteNotification(notificationId: number): Promise<void>;

    updateNotificationAnswer(notificationId: number, answer: number): Promise<void>;
}
