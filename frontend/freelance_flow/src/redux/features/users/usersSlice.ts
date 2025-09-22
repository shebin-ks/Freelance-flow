import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    AddUserResponse,
    DeleteUserResponse,
    InvitationSendRespone,
    UsersResponse,
    UsersState,
} from "./types.ts";
import {
    acceptInvite,
    addUser,
    changeUserStatus,
    getCompanyUsers,
    removeUser,
} from "./usersThunk";
import type { BaseResponse } from "../commonTypes/commonTypes";
import { clearRedux } from "../clearReducer";


const initialState: UsersState = {
    users: [],

    countAllUsers: 0,
    countActiveUsers: 0,
    countBlockedUsers: 0,
    countRevokedUsers: 0,
    countPendingUsers: 0,

    fetchUsersStatus: "idle",
    fetchUsersError: null,

    deleteUserStatus: "idle",
    deleteUserError: null,

    updateUserStatus: "idle",
    updateUserError: null,

    inviteUserStatus: "idle",
    inviteUserError: null,

    inviteAcceptStatus: "idle",
    inviteAcceptError: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUserDetails: (state, action: PayloadAction<{ userId: number, isOnline: boolean, lastSeen: string }>) => {
            const { userId, isOnline, lastSeen } = action.payload;
            const user = state.users.find((u) => u.id === userId);
            if (user) {
                user.isOnline = isOnline;
                user.lastSeen = lastSeen;
            }
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(clearRedux, () => initialState)


            // ------ Get All Users -----------
            .addCase(getCompanyUsers.pending, (state) => {
                state.fetchUsersStatus = "loading";
                state.fetchUsersError = null;
            })
            .addCase(getCompanyUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
                state.users = action.payload.users;

                state.countAllUsers = state.users.length;
                state.countActiveUsers = 0;
                state.countBlockedUsers = 0;
                state.countRevokedUsers = 0;
                state.countPendingUsers = 0;

                state.users.forEach(user => {
                    switch (user.status) {
                        case "active":
                            state.countActiveUsers++;
                            break;
                        case "blocked":
                            state.countBlockedUsers++;
                            break;
                        case "revoked":
                            state.countRevokedUsers++;
                            break;
                        case "pending":
                            state.countPendingUsers++;
                            break;
                    }
                });

                state.fetchUsersStatus = "succeeded";
            })
            .addCase(getCompanyUsers.rejected, (state, action) => {
                state.fetchUsersStatus = "failed";
                state.fetchUsersError = (action.payload as string) || "Failed to fetch Users";
            })

            // --------- Delete User -----------
            .addCase(removeUser.pending, (state) => {
                state.deleteUserStatus = "loading";
                state.deleteUserError = null;
            })
            .addCase(removeUser.fulfilled, (state, action: PayloadAction<DeleteUserResponse>) => {
                const deletedUserId = action.payload.userId;
                const deletedUser = state.users.find(user => user.id === deletedUserId);

                if (deletedUser) {
                    switch (deletedUser.status) {
                        case "active":
                            state.countActiveUsers--;
                            break;
                        case "blocked":
                            state.countBlockedUsers--;
                            break;
                        case "revoked":
                            state.countRevokedUsers--;
                            break;
                        case "pending":
                            state.countPendingUsers--;
                            break;
                    }
                }

                state.users = state.users.filter(user => user.id !== deletedUserId);
                state.countAllUsers--;
                state.deleteUserStatus = "succeeded";
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.deleteUserStatus = "failed";
                state.deleteUserError = (action.payload as string) || "Failed to delete user";
            })

            // ----------- Update User Status ----------
            .addCase(changeUserStatus.pending, (state) => {
                state.updateUserStatus = "loading";
                state.updateUserError = null;
            })
            .addCase(changeUserStatus.fulfilled, (state, action: PayloadAction<AddUserResponse>) => {
                state.updateUserStatus = "succeeded";

                const updated = action.payload.user;
                const existingUser = state.users.find(user => user.id === updated.id);

                if (existingUser) {
                    switch (existingUser.status) {
                        case "active":
                            state.countActiveUsers--;
                            break;
                        case "blocked":
                            state.countBlockedUsers--;
                            break;
                        case "revoked":
                            state.countRevokedUsers--;
                            break;
                        case "pending":
                            state.countPendingUsers--;
                            break;
                    }

                    existingUser.status = updated.status;

                    switch (updated.status) {
                        case "active":
                            state.countActiveUsers++;
                            break;
                        case "blocked":
                            state.countBlockedUsers++;
                            break;
                        case "revoked":
                            state.countRevokedUsers++;
                            break;
                        case "pending":
                            state.countPendingUsers++;
                            break;
                    }
                }
            })
            .addCase(changeUserStatus.rejected, (state, action) => {
                state.updateUserStatus = "failed";
                state.updateUserError = (action.payload as string) || "Failed to update user status";
            })

            // ------ Invite user -------------

            .addCase(
                addUser.pending,
                (state) => {
                    state.inviteUserStatus = 'loading'
                    state.inviteUserError = null
                }
            )
            .addCase(
                addUser.fulfilled,
                (state, action: PayloadAction<InvitationSendRespone>) => {

                    state.inviteUserStatus = 'succeeded'

                    state.countAllUsers++;
                    state.countPendingUsers++;

                    state.users.push(action.payload.user)

                }
            )
            .addCase(
                addUser.rejected,
                (state, action) => {
                    state.inviteUserStatus = 'failed'
                    state.inviteUserError = action.payload as string || 'Failed to Invite User'

                }
            )


            // ------ Accept Invite -------------

            .addCase(
                acceptInvite.pending,
                (state) => {
                    state.inviteAcceptStatus = 'loading'
                    state.inviteAcceptError = null
                }
            )
            .addCase(
                acceptInvite.fulfilled,
                (state, _: PayloadAction<BaseResponse>) => {

                    state.inviteAcceptStatus = 'succeeded'
                }
            )
            .addCase(
                acceptInvite.rejected,
                (state, action) => {
                    state.inviteAcceptStatus = 'failed';
                    state.inviteAcceptError = action.payload as string || 'Failed to accept invite'

                }
            )
    },
});


export const { updateUserDetails } = usersSlice.actions

export default usersSlice.reducer;
