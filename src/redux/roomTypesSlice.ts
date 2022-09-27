import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchRoomTypesAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";

export type RoomType = {
  minOccupancy: number,
  maxOccupancy: number
};

export type RoomTypes = {
  [key: string]: RoomType
};

export type State = {
  data: RoomTypes,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: {},
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "roomTypes/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetchRoomTypesAsync();
      return response.data;
    } catch(error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue({});
    }
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
