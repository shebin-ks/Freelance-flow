import type { BaseResponse, User } from "../commonTypes/commonTypes";

// ----- SLICE TYPE
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    loginError: string | null;

    registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    registerError: string | null;
}


// ----- API TYPES ----- 

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    companyName: string;
    email: string;
    password: string;
}


export interface RegisterRespone extends BaseResponse {
    data: User
}

export interface RefreshTokenResponse extends BaseResponse {
    accessToken:string
}

export interface LoginResponse extends BaseResponse {
    accessToken: string
    user: User
}