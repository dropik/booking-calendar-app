import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as Api from "../api";

export type RoomTypeData = {
  [key: string]: number[]
};

export type State = {
  data: RoomTypeData,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: {},
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "roomTypes/fetch",
  async () => {
    const response = await Api.fetchRoomTypesAsync();
    return response.data;
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default roomTypesSlice.reducer;
