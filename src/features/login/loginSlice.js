import { createSlice } from '@reduxjs/toolkit';
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: {},
        token: null,
        isLogged: null,
    },
    reducers: {
        loginRequest: (state, { payload }) => {
            state.user = payload;
            state.isLogged = null;
        },
        loginSuccess: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isLogged = true;
        },
        loginFailure: (state) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
        },
    },
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
    loginSlice.actions;
export default loginSlice.reducer;
