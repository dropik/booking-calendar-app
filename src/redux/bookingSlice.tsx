import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookingData } from "../api";

export type State = {
  data?: BookingData
};

const initialState: State = { };

export const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<BookingData>) => {
      state.data = action.payload;
    },
    unsetBookingData: (state) => {
      state.data = undefined;
    }
  }
});

export const { setBookingData, unsetBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
