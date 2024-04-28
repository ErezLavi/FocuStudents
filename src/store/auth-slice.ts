import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export {authSlice};

export const authActions = authSlice.actions;
export default authSlice.reducer;
