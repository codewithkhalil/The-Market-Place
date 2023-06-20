import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
import bidService from "./bidService"

export const placeNewBid = createAsyncThunk(
    'bid/add',
    async (data, thunkAPI) => {
        try {
            const response = await bidService.placeNewBid(data)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllBids = createAsyncThunk(
    'bid/getAll',
    async (data, thunkAPI) => {
        try {
            const response = await bidService.getAllBids(data)
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const initialState = {
    bids: null,
    isLoading: false,
    isSuccess: false,
    createSuccess: false,
}


const bidSlice = createSlice({
    initialState,
    name: 'bid',
    reducers: {
        resetBidStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.createSuccess = false;
        },

        resetBid: (state) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(placeNewBid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(placeNewBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createSuccess = true;
                message.success(action.payload)
            })
            .addCase(placeNewBid.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(getAllBids.pending, (state) => {
                state.isLoading = true;
                state.bids = null
            })
            .addCase(getAllBids.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bids = action.payload;
            })
            .addCase(getAllBids.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
    }
})


export const { resetBid, resetBidStatus } = bidSlice.actions; 

export default bidSlice.reducer