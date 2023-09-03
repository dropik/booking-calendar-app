import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export type RoomRate = {
  baseBoard: string,
};

export type RoomRates = {
  [key: string]: RoomRate,
};

export type State = {
  data: RoomRates,
  status: "idle" | "loading" | "failed",
};

const initialState: State = {
  data: { },
  status: "idle",
};

export const roomRatesSlice = createSlice({
  name: "roomRates",
  initialState: initialState,
  reducers: { },
  extraReducers: builder => {
    builder
      .addMatcher(api.endpoints.getCurrentUser.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = { };
        for (const { rateId, baseBoard } of payload.roomRates) {
          state.data[rateId] = { baseBoard };
        }
      })
      .addMatcher(api.endpoints.getCurrentUser.matchRejected, state => {
        state.status = "failed";
      });
  }
});

export default roomRatesSlice.reducer;
