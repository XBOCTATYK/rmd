import {EventBusService} from '../databus/services/eventBusService';

export type ISchedulingModuleConfig = {
    scheduler: any;
}

export type ISchedulingModuleExport = {
    dataBusService: EventBusService<SchedulingModuleDataBusEvent>;
}

export type SchedulingModuleDataBusEvent = {
    type: 'new-task';
    data: {
        date: string;
        time: string;
        description: string;
        priority: number;
        repeat: string;
    };
}
