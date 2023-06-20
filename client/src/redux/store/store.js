import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/user/userSlice';
import productReducer from '../slice/product/productSlice';
import bidReducer from '../slice/bid/bidSlice';
import notificationReducer from '../slice/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        bid: bidReducer,
        notification: notificationReducer
    }
})