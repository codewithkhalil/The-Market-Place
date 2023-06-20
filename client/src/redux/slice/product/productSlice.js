import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from 'antd';
import productService from "./productService"

export const addNewProduct = createAsyncThunk(
    'product/add',
    async (data, thunkAPI) => {
        try {
            const response = await productService.addProduct(data)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async (data, thunkAPI) => {
        try {
            const response = await productService.getAllProducts(data)
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSingleProduct = createAsyncThunk(
    'product/getSingle',
    async (id, thunkAPI) => {
        try {
            const response = await productService.getSingleProduct(id)
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const editProduct = createAsyncThunk(
    'product/edit',
    async (payload, thunkAPI) => {
        try {
            const response = await productService.editProduct(payload)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (payload, thunkAPI) => {
        try {
            const response = await productService.deleteProduct(payload)
            return response.message
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const uploadProductImage = createAsyncThunk(
    'product/uploadImage',
    async (payload, thunkAPI) => {
        try {
            const response = await productService.uploadProductImage(payload)
            return response
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProductStatus = createAsyncThunk(
    'product/updateStatus',
    async (payload, thunkAPI) => {
        try {
            const response = await productService.updateProductStatus(payload)
            console.log(response);
            return response
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const initialState = {
    products: null,
    product: null,
    isLoading: false,
    isSuccess: false,
    uploadSuccess: false,
    createSuccess: false,
    deleteSuccess: false,
    isUpdated: false,
    secure_url: ''
}

const productSlice = createSlice({
    initialState,
    name: 'product',
    reducers: {
        resetProductStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.uploadSuccess = false;
            state.createSuccess = false;
            state.deleteSuccess = false;
            state.isUpdated = false;
        },
        resetProduct: (state) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createSuccess = true;
                message.success(action.payload)
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUpdated = true;
                message.success(action.payload)
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteSuccess = true;
                message.success(action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                // state.products = null
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true;
                state.product = null
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(uploadProductImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadProductImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.secure_url = action.payload.data;
                message.success(action.payload.message);
                state.uploadSuccess = true;
            })
            .addCase(uploadProductImage.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
            .addCase(updateProductStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                message.success(action.payload.message);
                state.isUpdated = true;
            })
            .addCase(updateProductStatus.rejected, (state, action) => {
                state.isLoading = false;
                message.error(action.payload)
            })
    }
}) 

export const { resetProduct, resetProductStatus } = productSlice.actions; 

export default productSlice.reducer