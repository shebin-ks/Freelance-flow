import type { BaseResponse } from "../redux/features/commonTypes/commonTypes";
import type { AddUserResponse, DeleteUserResponse, InvitationAcceptPayload, InvitationPayload, InvitationSendRespone, UsersResponse, UserStatusPayload } from "../redux/features/users/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const fetchCompanyUsers = async () => {
  try {
    const { data } = await axiosInstance.get<UsersResponse>(API_ROUTES.USERS.GET_ALL);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const updateUserStatus = async (payload: UserStatusPayload) => {
  try {
    const { data } = await axiosInstance.patch<AddUserResponse>(API_ROUTES.USERS.UPDATE_STATUS, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user status');
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const { data } = await axiosInstance.delete<DeleteUserResponse>(`${API_ROUTES.USERS.DELETE}/${userId}`);
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

export const inviteUser = async (payload: InvitationPayload) => {
  try {
    const { data } = await axiosInstance.post<InvitationSendRespone>(API_ROUTES.AUTH.SEND_INVITE, payload);
    return data;
  } catch (error: any) {
    console.log("error");
    throw new Error(error.response?.data?.message || 'Failed to invite user');
  }
};

export const acceptInvitation = async (payload: InvitationAcceptPayload) => {
  try {
    const { data } = await axiosInstance.post<BaseResponse>(API_ROUTES.AUTH.ACCEPT_INVITE, payload);
    return data;
  } catch (error: any) {
    console.log("error");
    throw new Error(error.response?.data?.message || 'Failed to accept invitation');
  }
};
