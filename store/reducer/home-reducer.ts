import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initProduct = {
  products: [],
  errorResponses: []
}
const apiBase = import.meta.env.VITE_API_BASE_URL;

export const fetchItems = createAsyncThunk(
  'homeReducer/fetchItems',
  async () => {
    const [res1, res2] = await Promise.all([
      fetch(`${apiBase}/api/home`, { credentials: 'include' }),
      fetch(`${apiBase}/api/best-sellers`, { credentials: 'include' })
    ]);

    if (!res1.ok && res2.ok) {
      return {
        id: 'home-page',
        error: res1.statusText,
        isError: !res1.ok,
        source: 'home'
      };
    } else if (!res2.ok && res1.ok) {
      return {
        id: 'best-sellers',
        error: res2.statusText,
        isError: !res2.ok,
        source: 'home'
      };
    } else if (!res1.ok && !res2.ok) {
      return [
        {
          id: 'home-page',
          error: res1.statusText,
          isError: !res1.ok,
          source: 'home'
        },
        {
          id: 'best-sellers',
          error: res2.statusText,
          isError: !res2.ok,
          source: 'home'
        }
      ]
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
    dismissHomeAlerts: (state, action) => {
      state.errorResponses = state.errorResponses.filter(item => item.id !== action.payload.id) || [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      if (Array.isArray(action.payload) && action.payload.every(item => item.isError === true)) {
        state.errorResponses = action.payload;
      } else if (action.payload.isError) {
        state.errorResponses.push(...action.payload);
      } else {
        state.products = action.payload;
      }
    });
  },
});

export const { dismissHomeAlerts } = homePageReducer.actions;
export default homePageReducer.reducer;