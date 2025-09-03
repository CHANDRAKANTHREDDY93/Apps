import { createSlice } from "@reduxjs/toolkit";
import {  LOG_IN, LOG_OUT } from "store/actions/user-action";

export const initState = {
    isLoggedIn: false,
};
const userReducer = createSlice({
    name: 'userReducer',
    initialState: initState,
    reducers: {
        loggedIn: function(state) {
            state.isLoggedIn = true;
        },
        loggedOut: function(state = initState) {
            state.isLoggedIn = false;
        }
    }
});

export const { loggedIn, loggedOut } = userReducer.actions;
export default userReducer.reducer;