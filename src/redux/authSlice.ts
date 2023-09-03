import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

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
  reducers: {},
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

export default authSlice.reducer;
