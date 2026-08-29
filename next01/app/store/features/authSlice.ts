import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type AuthState = {
  user: User | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;
