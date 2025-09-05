import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBase = import.meta.env.VITE_API_BASE_URL;

export const initProduct = {
  numberCart: 0,
  carts: [],
  products: [],
};

export const fetchProducts = createAsyncThunk(
  'cartReducer/fetchProducts',
  async () => {
    const response = await fetch(`${apiBase}/api/products`, { credentials: 'include' });
    const products = await response.json();

    // Group products by category
    const categories: Record<string, any[]> = {};
    products.forEach((product: any) => {
      const category = product.category || "uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(product);
    });

    return categories;
  }
);

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initProduct,
  reducers: {
    addToCart: (state: any = initProduct, action) => {
      if (state.numberCart === 0) {
        const cart = {
          _id: action.payload._id,
          quantity: action.payload.quantity,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          description: action.payload.description,
          category: action.payload.category
        }
        state.numberCart++;
        state.carts.push(cart);
      } else {
        let check = false;
        state.carts.forEach((item: any, key: any) => {
          if (item._id === action.payload._id) {
              state.carts[key].quantity++;
              check = true;
          }
        });
        if (!check) {
          const cart = {
            _id: action.payload._id,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            description: action.payload.description,
            category: action.payload.category
          }
          state.carts.push(cart);
        }
      }
    },
    updateCart: (state: any, action) => {
      const itemIndex = state.carts.findIndex((item: any) => item._id === action.payload._id);
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
      const itemIndex = state.carts.findIndex((item: any) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.carts[itemIndex] = {
          ...state.carts[itemIndex],
          quantity: state.carts[itemIndex].quantity + 1
        }
      }
    },
    decreaseQuantity: (state: any = initProduct, action) => {
      const itemIndex = state.carts.findIndex((item: any) => item._id === action.payload._id);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  } 
});

export const { addToCart, updateCart, decreaseQuantity, increaseQuantity } = cartReducer.actions;
export default cartReducer.reducer;