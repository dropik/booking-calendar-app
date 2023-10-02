import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export type State = {
  username: string,
  visibleName?: string,
  structure: string,
};

const initialState: State = {
  username: "",
  structure: "",
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
        state.structure = payload.structure;
      })
      .addMatcher(api.endpoints.updateVisibleName.matchFulfilled, (state, action) => {
        state.visibleName = action.meta.arg.originalArgs.visibleName ?? undefined;
      });
  }
});

export default userSlice.reducer;
