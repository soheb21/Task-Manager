import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../utils/API";

export const addTaskAsync = createAsyncThunk("add-task", async (formData, { rejectWithValue }) => {

    try {
        const { data } = await API.post("/api/v1/task/create", formData)
        if (data.success) {
            toast.success(data.message, {
                position: "bottom-right"
            })
        }
        return data;

    } catch (error) {
        console.log("e", error)
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})
export const getAllTaskAsync = createAsyncThunk("get-task", async (args, { rejectWithValue }) => {

    try {
        const { data } = await API.get("/api/v1/task/get")
        if (data.success) {
            toast.success(data.message, {
                position: "bottom-right"
            })
        }
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})
export const updateTaskAsync = createAsyncThunk("update-task", async (doc, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/api/v1/task/update/${doc._id}`, doc)
        if (data.success) {
            toast.success(data.message, {
                position: "bottom-right"
            })
        }
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})
export const deleteTaskAsync = createAsyncThunk("delete-task", async (id, { rejectWithValue }) => {

    try {
        const { data } = await API.delete(`/api/v1/task/delete/${id}`)
        if (data.success) {
            toast.success(data.message, {
                position: "bottom-right"
            })
        }
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
})