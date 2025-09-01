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
    addToCart: (state = initProduct, action) => {
      if (state.numberCart === 0) {
        const cart = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          image: action.payload.name,
          price: action.payload.price
        }
        state.numberCart++;
        state.carts.push(cart);
      } else {
        let check = false;
        state.carts.forEach((item, key) => {
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
            image: action.payload.name,
            price: action.payload.price
          }
          state.carts.push(cart);
        }
      }
    },
    removeFromCart: (state = initProduct, action) => {

    },
    increaseQuantity: (state = initProduct, action) => {
      return {
        ...state,
      }
    },
    decreaseQuantity: (state = initProduct, action) => {
      return {
        ...state,
        quantity: action.payload.quantity--
      }
    }
  //   (state = initProduct, action) {
  // switch (action.type) {
  //   case GET_ALL_PRODUCTS:
  //     return { ...state, products: action.payload };
  //   case ADD_TO_CART:
  //     if (state.numberCart === 0) {
  //       const cart = {
  //         id: action.payload.id,
  //         quantity: 1,
  //         name: action.payload.name,
  //         image: action.payload.image,
  //         price: action.payload.price,
  //       };
  //       state.carts.push(cart);
  //     } else {
  //       let check = false;
  //       state.carts.map((item, key) => {
  //         if (item.id == action.payload.id) {
  //           state.carts[key].quantity++;
  //           check = true;
  //         }
  //       });
  //       if (!check) {
  //         const _cart = {
  //           id: action.payload.id,
  //           quantity: 1,
  //           name: action.payload.name,
  //           image: action.payload.image,
  //           price: action.payload.price,
  //         };
  //         state.carts.push(_cart);
  //       }
  //     }
  //     return {
  //       ...state,
  //       numberCart: state.numberCart + 1,
  //     };
  //   case REMOVE_FROM_CART:
  //     let quantity_ = state.carts[action.payload]?.quantity;
  //       return {
  //           ...state,
  //           numberCart: state.numberCart - quantity_,
  //           cartReducerarts: state.carts.filter((item) => {
  //           return item.id !== state.carts[action.payload]?.id;
  //       }),
  //   };
  //   case INCREASE_QUANTITY:
  //     state.numberCart++;
  //     state.carts[action.payload].quantity++;
  //     return {
  //       ...state,
  //   };
  //   case DECREASE_QUANTITY:
  //     const quantity = state.carts[action.payload].quantity;
  //     if (quantity > 1) {
  //       state.numberCart--;
  //       state.carts[action.payload].quantity--;
  //     }
  //     return {
  //       ...state,
  //     };
  //   case UPDATE_CART:
  // }
}
});

export const { addToCart, getAllProducts, decreaseQuantity, increaseQuantity } = cartReducer.actions;
export default cartReducer.reducer;