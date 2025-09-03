import cartReducer from './reducer/cart-reducer';
import { initProduct } from './reducer/cart-reducer';
import { createSlice } from '@reduxjs/toolkit'


// Create Slice
const cartStore = createSlice({
    name: 'shoppingCart',
    initialState: [initProduct],
    reducers: {
        ...cartReducer
    },
    extraReducers: (builder) => {
        builder.addCase('cartReducer/fetchProducts/fulfilled', (state, action) => {
            state[0].products = action.payload;
        });
    }
});

export default cartStore.reducer;