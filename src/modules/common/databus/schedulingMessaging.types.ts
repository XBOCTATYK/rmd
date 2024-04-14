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
        notificationId: number;
        dueDate: string;
        description: string;
        publicUserId: string;
    }
}
