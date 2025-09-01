import { configureStore, Tuple } from '@reduxjs/toolkit';
import userReducer from './reducer/user-reducer';
import cartReducer from './reducer/cart-reducer';

export const userStore = configureStore({
    reducer: {
        reducer: userReducer,
        cartReducer: cartReducer
    },
    // middleware: () => new Tuple(additionalMiddleware, logger),
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;