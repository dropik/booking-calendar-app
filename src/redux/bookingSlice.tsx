import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookingData } from "../api";

export type State = {
  data?: BookingData,
  scrollTop: number
};

const initialState: State = {
  scrollTop: 0
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<BookingData>) => {
      state.data = action.payload;
    },
    unsetBookingData: (state) => {
      state.data = undefined;
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload;
    }
  }
});

export const { setBookingData, unsetBookingData, setScrollTop } = bookingSlice.actions;

export default bookingSlice.reducer;
