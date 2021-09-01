import { createSlice } from "@reduxjs/toolkit";
import { remToPx } from "./utils";

export const horizontalScrollSlice = createSlice({
  name: "horizontalScroll",
  initialState: {
    currentDate: new Date().toLocaleDateString('en-CA'),
    scrollLeft: 0
  },
  reducers: {
    scroll: (state, action) => {
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor((action.payload.scrollLeft + cellWidth / 2) / cellWidth);
      let newDate = new Date(action.payload.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = newDate.toLocaleDateString('en-CA');
      state.scrollLeft = action.payload.scrollLeft;
    }
  }
});

export const { scroll } = horizontalScrollSlice.actions;

export default horizontalScrollSlice.reducer;