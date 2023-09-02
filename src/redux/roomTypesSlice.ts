/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { fetchAsync as fetchCurrentUserAction } from "./userSlice";

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

export const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUserAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = {};
        const response = action.payload;
        for (const { name, minOccupancy, maxOccupancy } of response.roomTypes) {
          state.data[name] = { minOccupancy, maxOccupancy };
        }
      })
      .addCase(fetchCurrentUserAction.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default roomTypesSlice.reducer;
