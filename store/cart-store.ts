import cartReducer from './reducer/cart-reducer';
import { initProduct } from './reducer/cart-reducer';
import { createSlice } from '@reduxjs/toolkit'


// Create Slice
const cartStore = createSlice({
    name: 'shoppingCart',
    initialState: [initProduct],
    reducers: {
        ...cartReducer
    }
});

export default cartStore.reducer;