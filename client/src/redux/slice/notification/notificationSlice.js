import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
import notificationService from "./notificationService"

export const addNotification = createAsyncThunk(
    'notification/add',
    async (data, thunkAPI) => {
        try {
            console.log('here in slice');
            const response = await notificationService.addNotification(data)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getAllNotification = createAsyncThunk(
    'notification/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await notificationService.getNotification()
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const deleteNotification = createAsyncThunk(
    'notification/delete',
    async (id, thunkAPI) => {
        try {
            const response = await notificationService.deleteNotification(id)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const readAllNotification = createAsyncThunk(
    'notification/readAll',
    async (_, thunkAPI) => {
        try {
            const response = await notificationService.readAllNotifications()
            return response
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const initialState = {
    notifications: null,
    isLoading: false,
    isDeleting: false,
    isSuccess: false,
    createSuccess: false,
    readSuccess: false,
}


const notificationSlice = createSlice({
    initialState,
    name: 'notification',
    reducers: {
        resetNotificationStatus: (state) => {
            state.isLoading = false;
            state.isDeleting = false;
            state.isSuccess = false;
            state.createSuccess = false;
            state.readSuccess = false;
        },
        resetNotification: (state) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(addNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createSuccess = true;
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(getAllNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notifications = action.payload
            })
            .addCase(getAllNotification.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(deleteNotification.pending, (state) => {
                state.isDeleting = true;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.isDeleting = false;
                state.readSuccess = true;
                message.success(action.payload)
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.isDeleting = false;
                message.error(action.payload)
            })
            .addCase(readAllNotification.fulfilled, (state, action) => {
                state.readSuccess = true;
            })
    }
})

export const { resetNotification, resetNotificationStatus } = notificationSlice.actions; 

export default notificationSlice.reducer