import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "./authThunk";
import type { AuthState, LoginResponse, RegisterRespone } from "./types";

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('accessToken');

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: storedToken || null,
    loginStatus: 'idle',
    loginError: null,

    registerStatus: 'idle',
    registerError: null,

};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');


        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
    },
    extraReducers: builder => {
        builder

            // ---------- Login ---------------
            .addCase(login.pending, state => {
                state.loginStatus = 'loading';
                state.loginError = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loginStatus = 'succeeded';
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(action.payload.user));


                if (action.payload.accessToken) {

                    localStorage.setItem('accessToken', action.payload.accessToken);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loginStatus = 'failed';

                state.loginError = action.payload as string || 'Login failed';
            })

            // ---------- Register ---------------
            .addCase(register.pending, state => {
                state.registerStatus = 'loading';
                state.registerError = null;
            })
            .addCase(register.fulfilled, (state, _action: PayloadAction<RegisterRespone>) => {
                state.registerStatus = 'succeeded';



            })
            .addCase(register.rejected, (state, action) => {
                state.registerStatus = 'failed';

                state.registerError = action.payload as string || 'Registration failed';
            });

    }
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
