import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as Api from "../api";
import { RootState } from "./store";
import * as TilesSlice from "./tilesSlice";

export type State = {
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  status: "idle"
};

export const postChangesAsync = createAsyncThunk(
  "changes/save",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const response = await Api.postChangesAsync(state.tiles.changesMap);
    thunkApi.dispatch(TilesSlice.saveChanges());
    return response.data;
  }
);

export type PostAsyncAction = ReturnType<typeof postChangesAsync>;

export const saveChangesSlice = createSlice({
  name: "saveChanges",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(postChangesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postChangesAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(postChangesAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default saveChangesSlice.reducer;
