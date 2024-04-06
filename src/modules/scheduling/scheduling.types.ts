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
