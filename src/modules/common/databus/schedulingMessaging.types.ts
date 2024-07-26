export enum ESchedulingEventsType {
  NEW_TASK = 'new-task',
  SEND_NOTIFICATION = 'send-notification',
  HELLO = 'hello',
  TASK_LIST_REQUEST = 'task-list-request',
  TASK_LIST_ACQUIRED = 'task-list-acquired',
  NOTIFICATION_ANSWER = 'notification-answer',
  TASK_CREATED = 'task-created',
}

export type NewTaskEvent = {
    type: ESchedulingEventsType.NEW_TASK;
    data: {
        date: string;
        time: string;
        description: string;
        priority?: number;
        repeat?: string;
    },
    metadata: {
        publicUserId: string
    }
}

export type SendNotificationEvent = {
    type: ESchedulingEventsType.SEND_NOTIFICATION;
    data: {
        notificationId: number;
        dueDate: string;
        description: string;
        nextNotificationDate?: string;
    },
    metadata: {
        publicUserId: string
    }
}

export type HelloEvent = {
    type: ESchedulingEventsType.HELLO;
    data: {
        message: string
    }
}

export type TaskListRequestEvent = {
    type: ESchedulingEventsType.TASK_LIST_REQUEST;
    data: {},
    metadata: {
        publicUserId: string
    }
}

export type TaskListAcquiredEvent = {
    type: ESchedulingEventsType.TASK_LIST_ACQUIRED;
    data: {
        tasks: Array<{
            dueDate: string,
            description: string,
            notificationCount: number
        }>,
    },
    metadata: {
        publicUserId: string
    }
}

export type SendNotificationAnswerEvent = {
    type: ESchedulingEventsType.NOTIFICATION_ANSWER;
    data: {
        notificationId: number;
        answer: number;
    }
}

export type TaskCreatedEvent = {
    type: ESchedulingEventsType.TASK_CREATED;
    data: {
        description: string,
        dueDate: string,
        firsNotificationDate: string
    },
    metadata: {
        publicUserId: string
    }
}

export type SchedulingEvents =
    NewTaskEvent |
    SendNotificationEvent |
    TaskListRequestEvent |
    TaskListAcquiredEvent |
    SendNotificationAnswerEvent |
    HelloEvent |
    TaskCreatedEvent;
