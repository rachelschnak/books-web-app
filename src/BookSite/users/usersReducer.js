import { createSlice } from "@reduxjs/toolkit";
import * as client from "./client";

const initialState = {
    user:  null,
};
const userSlice = createSlice({
                                     name: "user",
                                     initialState,
                                     reducers: {
                                         setUser: (state, action) => {
                                             state.user = action.payload;
                                         },

                                         signoutUser: (state, action) => {
                                              state.user = null;
                                         },
                                         getUser: (state, action) => {
                                             return (state.user);
                                         },

                                     },
                                 });
export const { setUser, signoutUser, getUser} = userSlice.actions;
export default userSlice.reducer;