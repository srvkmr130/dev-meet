import { createSlice } from "@reduxjs/toolkit";

// Initial State
var initialAuthState = {
  isLoggedIn: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginUser: (state) => {
      return { isLoggedIn: true };
    },
    logoutUser: (state) => {
      return { isLoggedIn: false };
    },
  },
});

export const {
  loginUser: loginUserActionCreator,
  logoutUser: logoutUserActionCreator,
} = authSlice.actions;

export default authSlice.reducer;
