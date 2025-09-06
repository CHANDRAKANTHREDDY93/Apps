import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const initProduct = {
  carts: [],
  products: [],
  category: 'fruits'
};

const categoryReducer = createSlice({
  name: 'categoryReducer',
  initialState: initProduct,
  reducers: {
    setCategory: (state: any, action) => {
     const { products, category } = action.payload;
      state.products = products.filter(item => item.category === category || category === 'fruits');
      state.category = category;
    }
  }
});

export const { setCategory } = categoryReducer.actions;
export default categoryReducer.reducer;