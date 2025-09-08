import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initProduct = {
    products: []
}

export const fetchItems = createAsyncThunk(
  'homeReducer/fetchItems',
  async () => {
    const [res1, res2] = await Promise.all([
      fetch('/api/home'),
      fetch('/api/best-sellers')
    ]);

    if (!res1.ok || !res2.ok) {
      throw new Error('Failed to fetch one or both endpoints');
    }

    const [data1, data2] = await Promise.all([
      res1.json(),
      res2.json()
    ]);
    const products = [...data1, ...data2];

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

const homePageReducer = createSlice({
    name: 'cartReducer',
    initialState: initProduct,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default homePageReducer.reducer;