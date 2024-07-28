import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

export const registerAsync = createAsyncThunk("/register", async (formData, { rejectWithValue }) => {

    try {
        const { data } = await API.post("/api/v1/auth/register", formData)
        if (data.success) {
            localStorage.setItem("token", data.token)
        }
        return data;

    } catch (error) {
        console.log("register-e", error)
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})

export const loginAsync = createAsyncThunk("/login", async (formData, { rejectWithValue }) => {

    try {
        const { data } = await API.post("/api/v1/auth/login", formData)
        if (data.success) {
            localStorage.setItem("token", data.token)
        }
        console.log("login-data", data)

        return data;

    } catch (error) {
        console.log("login-e", error)
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})
export const userAsync = createAsyncThunk("/get-user", async (formData, { rejectWithValue }) => {

    try {
        const { data } = await API.get("/api/v1/auth/get-user")
        return data;

    } catch (error) {
        console.log("auth-e", error)
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})

