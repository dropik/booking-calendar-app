import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenResponse, api } from "../api";

export type State = {
  accessToken: string,
  refreshToken: string,
};

const initialState: State = {
  accessToken: window.localStorage.getItem("accessToken") ?? "",
  refreshToken: window.localStorage.getItem("refreshToken") ?? "",
};

const ACCESS_TOKEN_STORAGE_NAME = "accessToken";
const REFRESH_TOKEN_STORAGE_NAME = "refreshToken";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, action.payload.accessToken);
      window.localStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, action.payload.refreshToken);
    },
    logout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, "");
      window.localStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.postAuthToken.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        window.localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, payload.accessToken);
        window.localStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, payload.refreshToken);
      });
  }
});

export const { setTokens, logout } = authSlice.actions;

export default authSlice.reducer;
