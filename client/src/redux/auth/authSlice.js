import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, registerAsync, userAsync } from "./authAPI";

const initialState = {
    loading: false,
    user: {},
    error: null,
    isAuth: false,
    message: null
}
const userSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        logout(state) {
            localStorage.clear();
            state.isAuth = false;
            state.loading = false;
            state.error = null;
            state.message = "Logout Successfully"
        },
        clearAllError(state) {
            state.error = null;
            state.loading = false;
            state.user = state.user;
            state.isAuth = state.isAuth;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuth = true;
            state.message = payload.message;
        })
        builder.addCase(registerAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.isAuth = state.isAuth;
            state.error = payload;
        })
        builder.addCase(loginAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuth = true;
            state.message = payload.message;
        })
        builder.addCase(loginAsync.rejected, (state, { payload }) => {
            console.log("login-e", payload)
            state.loading = false;
            state.isAuth = state.isAuth;
            state.error = payload;

        })
        builder.addCase(userAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(userAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuth = true;
            state.user = payload.doc
        })
        builder.addCase(userAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.isAuth = state.isAuth;
            state.error = payload;
            state.user = state.user;

        })
    }

})
export const { logout, clearAllError } = userSlice.actions;
export default userSlice.reducer;