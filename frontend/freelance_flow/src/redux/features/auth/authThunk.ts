import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../../api/authApi";
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterRespone } from "./types";
import axiosInstance from "../../../api/axiosInstance";
import type { BaseResponse } from "../commonTypes/commonTypes";
import { API_ROUTES } from "../../../api/apiRoutes";
import type { InvitationAcceptPayload } from "../users/types";

export const login = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: string }
>(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const res = await loginUser(payload);
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const register = createAsyncThunk<
    RegisterRespone,
    RegisterPayload,
    { rejectValue: string }
>(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const res = await registerUser(payload);
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




export const forgotPassword = createAsyncThunk<
    BaseResponse,
    { email: string },
    { rejectValue: string }
>(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            const response = await axiosInstance.post<BaseResponse>(API_ROUTES.AUTH.FORGOT_PASSWORD, email);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);


export const resetPassword = createAsyncThunk<
    BaseResponse,
    InvitationAcceptPayload,
    { rejectValue: string }
>(
    'auth/resetPassword',
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.post<BaseResponse>(
                API_ROUTES.AUTH.RESET_PASSWORD,
                payload
            );
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Reset failed');
        }
    }
);
