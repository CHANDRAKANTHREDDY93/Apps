import { configureStore, Tuple } from '@reduxjs/toolkit';
import userReducer from './reducer/user-reducer';
import cartReducer from './reducer/cart-reducer';
import categoryReducer from './reducer/category-reducer';
import homePageReducer from './reducer/home-reducer';

export const userStore = configureStore({
    reducer: {
        reducer: userReducer,
        cartReducer: cartReducer,
        categoryReducer: categoryReducer,
        homePageReducer: homePageReducer
    },
    // middleware: () => new Tuple(additionalMiddleware, logger),
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;