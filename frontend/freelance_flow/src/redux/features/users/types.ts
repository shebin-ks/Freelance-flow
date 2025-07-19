

// ------ SLICE TYPE --------

import type { BaseResponse, User } from "../commonTypes/commonTypes";

export interface UsersState {
    users: User[]

    countAllUsers: number;
    countActiveUsers: number;
    countBlockedUsers: number;
    countRevokedUsers: number;
    countPendingUsers: number;


    fetchUsersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchUsersError: string | null;


    deleteUserStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    deleteUserError: string | null;

    updateUserStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    updateUserError: string | null;

    inviteUserStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    inviteUserError: string | null;

    inviteAcceptStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    inviteAcceptError: string | null;

}


// ------- API TYPES ------

export interface UserStatusPayload {
    userId: number;
    status: string
}

export interface InvitationPayload {
    email: string;
    name: string;
    role: string
}

export interface InvitationSendRespone extends AddUserResponse { }

export interface InvitationAcceptPayload {
    token: string;
    password: string;
}

export interface AddUserResponse extends BaseResponse {
    user: User
}

export interface DeleteUserResponse extends BaseResponse {
    userId: number
}

export interface UsersResponse extends BaseResponse {
    users: User[]

}