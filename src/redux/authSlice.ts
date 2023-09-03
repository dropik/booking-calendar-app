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

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.localStorage.setItem("accessToken", action.payload.accessToken);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.postAuthToken.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        window.localStorage.setItem("accessToken", payload.accessToken);
        window.localStorage.setItem("refreshToken", payload.refreshToken);
      });
  }
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;
