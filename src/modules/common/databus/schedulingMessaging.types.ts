export type SchedulingEvents = {
    type: 'new-task';
    data: {
        date: string;
        time: string;
        description: string;
        priority?: number;
        repeat?: string;
    }
} | {
    type: 'hello',
    data: {
        message: string
    }
} | {
    type: 'send-notification';
    data: {
        dueDate: string;
        description: string;
        userId: number;
    }
}
