import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchFloorsAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";

export type Room = {
  number: number,
  type: string
};

export type Rooms = {
  [key: string]: Room
};

export type Floor = {
  name: string,
  rooms: Rooms
};

export type Floors = {
  [key: string]: Floor
};

export type State = {
  data: Floors,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: { },
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "floors/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetchFloorsAsync();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue({});
    }
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const floorsSlice = createSlice({
  name: "floors",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = { };
        const data = action.payload;
        for (const floor of data) {
          const rooms: Rooms = { };
          for (const room of floor.rooms) {
            rooms[room.id] = { number: room.number, type: room.type };
          }
          state.data[floor.id] = { name: floor.name, rooms };
        }
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default floorsSlice.reducer;
