import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice"
import authReducer from "./auth/authSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        auth: authReducer
    },
});