/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

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
      .addMatcher(api.endpoints.getCurrentUser.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = {};
        for (const { name, minOccupancy, maxOccupancy } of payload.roomTypes) {
          state.data[name] = { minOccupancy, maxOccupancy };
        }
      })
      .addMatcher(api.endpoints.getCurrentUser.matchRejected, (state) => {
        state.status = "failed";
      });
  }
});

export default roomTypesSlice.reducer;
