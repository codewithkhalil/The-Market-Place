import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { clearStorage, setSessionToken } from "../../../utils/storage";
import userService from "./userService";

export const createUser = createAsyncThunk(
    'user/create',
    async (userData, thunkAPI) => {
        try {
            return await userService.createUser(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, thunkAPI) => {
        try {
            return await userService.loginUser(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)
export const getCurrentUser = createAsyncThunk(
    'user/get',
    async (_, thunkAPI) => {
        try {
            return await userService.getCurrentUser()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)
export const getAllUsers = createAsyncThunk(
    'user/getAll',
    async (_, thunkAPI) => {
        try {
            return await userService.getAllUsers()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

export const updateUserStatus = createAsyncThunk(
    'user/updateStatus',
    async (payload, thunkAPI) => {
        try {
            const response = await userService.updateUserStatus(payload)
            return response
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    createSuccess: false,
    all_users: null
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        resetUserStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.createSuccess = false;
        },
        resetCreateUserStatus: (state) => {
            state.createSuccess = false;
        },
        resetUser: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createSuccess = true;
                message.success(action.payload.message)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                message.success(action.payload.message)
                clearStorage()
                setSessionToken('token', action.payload.data)
                // state.user = action.payload.user
                state.isSuccess = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
                if (action.payload === "Not authorized") {
                    clearStorage()
                }
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.all_users = action.payload.data
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
                if (action.payload === "Not authorized") {
                    clearStorage()
                }
            })
            .addCase(updateUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                message.success(action.payload.message);
                state.isSuccess = true;
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })

    }
})

export const { resetUserStatus, resetCreateUserStatus, resetUser } = userSlice.actions

export default userSlice.reducer