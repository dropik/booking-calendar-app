import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchHotelDataAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";

export type RoomData = {
  number: number,
  type: string
};

export type FloorData = {
  name: string,
  rooms: RoomData[]
};

export type HotelData = {
  floors: FloorData[]
};

export type State = {
  data: HotelData,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: { floors: [] },
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "hotel/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetchHotelDataAsync();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue({});
    }
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const hotelSlice = createSlice({
  name: "hotel",
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

export default hotelSlice.reducer;
