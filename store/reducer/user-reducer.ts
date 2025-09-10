import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBase = import.meta.env.VITE_API_BASE_URL;
export const initState = {
    isLoggedIn: false,
    errorResponses: []
};

export const fetchLogin = createAsyncThunk(
  'homeReducer/fetchItems',
  async (email, password) => {
    const response = await fetch(`${apiBase}/api/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
      credentials: 'include'
    })
    if (!response.ok) {
      return {
        error: response.statusText,
        isError: !response.ok,
        id: 'login',
        source: 'login'
      }
    } else {
        const loginResponse = await response.json();
        return loginResponse;
    }
  });

const userReducer = createSlice({
    name: 'userReducer',
    initialState: initState,
    reducers: {
        loggedIn: function(state) {
            state.isLoggedIn = true;
        },
        loggedOut: function(state = initState) {
            state.isLoggedIn = false;
        },
        dismissLoginAlerts: (state, action) => {
            state.errorResponses = [];
        }
    },
      extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            if (action.payload.isError && !state.errorResponses.length) {
                state.errorResponses.push(action.payload)
            }
        });
      },
});

export const { loggedIn, loggedOut, dismissLoginAlerts } = userReducer.actions;
export default userReducer.reducer;