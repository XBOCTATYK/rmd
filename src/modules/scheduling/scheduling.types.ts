import {Notification, Task} from './model';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export interface ITaskScheduleDaoService {
    saveTask(task: Task): Promise<void>;

    getTask(taskId: number): Promise<Task>;

    getTasksByUser(userId: number): Promise<Task[]>;

    getTasksByCurrentDate(date: Date): Promise<Task[]>;

    deleteTask(taskId: number): Promise<void>;

    updateTaskStatus(taskId: number, status: number): Promise<void>;

    updateNotificationCount(taskId: number, count: number): Promise<void>;

    updateDueDate(taskId: number, dueDate: Date): Promise<void>;
}

export interface INotificationsDaoService {
    saveNotification(notification: Notification): Promise<void>;

    getNextNotificationForTask(taskId: number): Promise<Notification>;

    deleteNotification(notificationId: number): Promise<void>;

    updateNotificationAnswer(notificationId: number): Promise<void>;
}
