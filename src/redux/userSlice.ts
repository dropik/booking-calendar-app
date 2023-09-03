/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export type User = {
  username: string,
  visibleName: string,
};

const initialState: User = {
  username: "",
  visibleName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.username = payload.username;
        state.visibleName = payload.visibleName;
      });
  }
});

export default userSlice.reducer;
