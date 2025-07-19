import { createAsyncThunk } from "@reduxjs/toolkit"
import type { AddUserResponse, DeleteUserResponse, InvitationAcceptPayload, InvitationPayload, InvitationSendRespone, UsersResponse, UserStatusPayload } from "./types"
import { acceptInvitation, deleteUser, fetchCompanyUsers, inviteUser, updateUserStatus } from "../../../api/userApi"
import type { BaseResponse } from "../commonTypes/commonTypes"

export const getCompanyUsers = createAsyncThunk<
    UsersResponse,
    void,
    { rejectValue: string }
>(
    "users/getCompanyUsers",
    async (_, thunkApi) => {
        try {

            const response = await fetchCompanyUsers()

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)



export const changeUserStatus = createAsyncThunk<
    AddUserResponse,
    UserStatusPayload,
    { rejectValue: string }
>(
    'users/changeUserStatus',
    async (payload, thunkApi) => {
        try {

            const response = await updateUserStatus(payload)

            return response

        } catch (error: any) {
            
            return thunkApi.rejectWithValue(error.message)
        }

    }
)



export const removeUser = createAsyncThunk<
    DeleteUserResponse,
    number,
    { rejectValue: string }
>(
    'users/removeUser',
    async (userId, thunkApi) => {
        try {
            const response = await deleteUser(userId)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const addUser = createAsyncThunk<
    InvitationSendRespone,
    InvitationPayload,
    { rejectValue: string }
>(
    'users/addUser',
    async (payload, thunkApi) => {
        try {
            const response = await inviteUser(payload)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


export const acceptInvite = createAsyncThunk<
    BaseResponse,
    InvitationAcceptPayload,
    { rejectValue: string }
>(
    'users/acceptInvite',
    async (payload, thunkApi) => {
        try {
            const response = await acceptInvitation(payload)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)