export type NewTaskEvent = {
    type: 'new-task';
    data: {
        date: string;
        time: string;
        description: string;
        priority?: number;
        repeat?: string;
    }
}

export type SendNotificationEvent = {
    type: 'send-notification';
    data: {
        notificationId: number;
        dueDate: string;
        description: string;
        publicUserId: string;
    }
}

export type HelloEvent = {
    type: 'hello';
    data: {
        message: string
    }
}

export type TaskListRequestEvent = {
    type: 'task-list-request';
    data: {
        publicUserId: string
    }
}

export type TaskListAcquiredEvent = {
    type: 'task-list-acquired';
    data: {
        tasks: Array<{
            dueDate: string,
            description: string,
            notificationCount: number
        }>,
        publicUserId: string
    },
}


export type SchedulingEvents =
    NewTaskEvent |
    SendNotificationEvent |
    TaskListRequestEvent |
    TaskListAcquiredEvent |
    HelloEvent;
