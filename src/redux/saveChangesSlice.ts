import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as Api from "../api";
import { RootState } from "./store";
import * as TilesSlice from "./tilesSlice";

export type Status = "idle" | "loading" | "failed" | "fulfilled";

export type State = {
  status: Status
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
  reducers: {
    resetIdle: (state) => {
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postChangesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postChangesAsync.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(postChangesAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { resetIdle } = saveChangesSlice.actions;

export default saveChangesSlice.reducer;
