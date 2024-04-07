import {TaskScheduleService} from './services/TaskScheduleService';

export type ISchedulingModuleExport = {
    taskScheduleService: TaskScheduleService;
}

export * from './model';
