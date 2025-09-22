

export interface NotificationState {
    fetchStatus: 'idle' | 'succeeded' | 'failed';
    notifications: Notification[]
}

export interface Notification {
    id: number;
    type: string;
    message: string;
    data: any;
    createdAt: string;
    seen: boolean;
}
