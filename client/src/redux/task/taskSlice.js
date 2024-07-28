import { createSlice } from "@reduxjs/toolkit";
import { addTaskAsync, deleteTaskAsync, getAllTaskAsync, updateTaskAsync } from "./taskAPI";

const initialState = {
    tasks: [],
    message: null,
    error: null,
    loading: false
}
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearAllErrors(state) {
            state.error = null;
            state.tasks = state.tasks;
            state.loading = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTaskAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addTaskAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.message = payload.message;
            state.tasks.push(payload.doc)
        })
        builder.addCase(addTaskAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(getAllTaskAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllTaskAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.tasks = payload.doc;

        })
        builder.addCase(getAllTaskAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(updateTaskAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateTaskAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            let index = state.tasks.findIndex(i => i._id === payload.doc._id)
            state.tasks[index] = payload.doc;
        })
        builder.addCase(updateTaskAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(deleteTaskAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteTaskAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.message = payload.message;
            let filterTask = state.tasks.filter(i => i._id !== payload.id);
            state.tasks = filterTask;

        })
        builder.addCase(deleteTaskAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
    }

})
export const { clearAllErrors } = taskSlice.actions;
export default taskSlice.reducer;