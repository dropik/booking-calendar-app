import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomRatesAction } from "./roomTypesSlice";

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
      .addCase(fetchRoomRatesAction.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchRoomRatesAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = { };
        const response = action.payload;
        for (const { rateId, baseBoard } of response.roomRates) {
          state.data[rateId] = { baseBoard };
        }
      })
      .addCase(fetchRoomRatesAction.rejected, state => {
        state.status = "failed";
      });
  }
});

export default roomRatesSlice.reducer;
