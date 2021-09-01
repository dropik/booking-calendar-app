import { createSlice } from "@reduxjs/toolkit";
import { remToPx } from "./utils";
import globals from "./globals";

export const horizontalScrollSlice = createSlice({
  name: "horizontalScroll",
  initialState: {
    currentDate: new Date().toLocaleDateString('en-CA'),
    startDate: calculateStartDate(new Date()),
    columns: getInitialColumnsAmount(document.documentElement.clientWidth),
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
    },
    changeDate: (state, action) => {
      state.startDate = calculateStartDate(action.payload.date);
      state.columns = getInitialColumnsAmount(document.documentElement.clientWidth);
    },
    resize: state => {
      state.columns = getInitialColumnsAmount(document.documentElement.clientWidth);
    },
    fetchLeft: state => {
      state.startDate = calculateStartDate(state.startDate);
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
    },
    fetchRight: state => {
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
    }
  }
});

function calculateStartDate(date) {
  let result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result.toLocaleDateString('en-CA');
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export const { scroll, changeDate, resize, fetchLeft, fetchRight } = horizontalScrollSlice.actions;

export default horizontalScrollSlice.reducer;