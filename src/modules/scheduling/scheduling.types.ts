import {Task} from './model';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export interface ITaskScheduleDaoService {
    saveTask(): Promise<void>;

    getTask(): Promise<Task>;

    deleteTask(): Promise<void>;

    updateTaskStatus(): Promise<void>;

    updateNotificationCount(): Promise<void>;

    updateDueDate(): Promise<void>;
}
