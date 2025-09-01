import { createSlice } from "@reduxjs/toolkit";
import {  LOG_IN, LOG_OUT } from "store/actions/user-action";

export const initState = {
    isLoggedIn: false,
};
const userReducer = createSlice({
    name: 'userReducer',
    initialState: initState,
    reducers: {
        loggedIn: function(state = initState) {
            return {
                ...state,
                isLoggedIn: true
            }
        },
        loggedOut: function(state = initState) {
            return {
                ...state,
                isLoggedIn: false
            }
        }
    }
});

export const { loggedIn, loggedOut } = userReducer.actions;
export default userReducer.reducer;