import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  GET_ALL_PRODUCTS,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "store/actions/cart-action";

export const initProduct = {
  numberCart: 0,
  carts: [],
  products: [],
};

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initProduct,
  reducers: {
    getAllProducts: (state = initProduct, action) => {
      return { ...state, products: action.payload }
    },
    addToCart: (state: any = initProduct, action) => {
      if (state.numberCart === 0) {
        const cart = {
          id: action.payload.id,
          quantity: action.payload.quantity,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          description: action.payload.description
        }
        state.numberCart++;
        state.carts.push(cart);
      } else {
        let check = false;
        state.carts.forEach((item: any, key: any) => {
          if (item.id === action.payload.id) {
              state.carts[key].quantity++;
              check = true;
          }
        });
        if (!check) {
          const cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            description: action.payload.description
          }
          state.carts.push(cart);
        }
      }
    },
    updateCart: (state: any, action) => {
      const itemIndex = state.carts.findIndex((item: any) => item.image === action.payload.image);
      if (itemIndex >= 0) {
        state.carts[itemIndex] = {
          ...state.carts[itemIndex],
          quantity: state.carts[itemIndex].quantity + 1
        }
      } else {
        state.carts.push(action.payload);
      }
    },
    removeFromCart: (state = initProduct, action) => {

    },
    increaseQuantity: (state: any = initProduct, action) => {
      const itemIndex = state.carts.findIndex((item: any) => item.image === action.payload.image);
      if (itemIndex >= 0) {
        state.carts[itemIndex] = {
          ...state.carts[itemIndex],
          quantity: state.carts[itemIndex].quantity + 1
        }
      }
    },
    decreaseQuantity: (state: any = initProduct, action) => {
      const itemIndex = state.carts.findIndex((item: any) => item.image === action.payload.image);
      if (itemIndex >= 0) {
        state.carts[itemIndex] = {
          ...state.carts[itemIndex],
          quantity: state.carts[itemIndex].quantity - 1
        }
        if (state.carts[itemIndex].quantity === 0) {
          state.carts.splice(itemIndex, 1);
        }
      }
    }
}
});

export const { addToCart, updateCart, getAllProducts, decreaseQuantity, increaseQuantity } = cartReducer.actions;
export default cartReducer.reducer;