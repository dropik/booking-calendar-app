import { createSlice } from "@reduxjs/toolkit";
import { remToPx } from "./utils";

export const currentDateSlice = createSlice({
  name: "currentDate",
  initialState: {
    value: new Date().toLocaleDateString('en-CA')
  },
  reducers: {
    scroll: (state, action) => {
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor((action.payload.scrollLeft + cellWidth / 2) / cellWidth);
      let newDate = new Date(action.payload.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.value = newDate.toLocaleDateString('en-CA');
    },
    setDate: (state, action) => {
      state.value = action.payload.newDateString;
    }
  }
});

export const { scroll, setDate } = currentDateSlice.actions;

export default currentDateSlice.reducer;