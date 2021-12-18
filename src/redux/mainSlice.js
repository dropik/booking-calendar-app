import { createSlice } from "@reduxjs/toolkit";

import { remToPx } from "../utils";
import globals from "../globals";
import mocks from "../mocks";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    currentDate: new Date().toLocaleDateString("en-CA"),
    startDate: calculateStartDate(new Date()),
    columns: getInitialColumnsAmount(document.documentElement.clientWidth),
    scrollLeft: 0,
    tiles: mocks.tiles,
  },
  reducers: {
    scroll: (state, action) => {
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor(
        (action.payload.scrollLeft + cellWidth / 2) / cellWidth
      );
      let newDate = new Date(state.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = newDate.toLocaleDateString("en-CA");
      state.scrollLeft = action.payload.scrollLeft;
    },
    changeDate: (state, action) => {
      state.startDate = calculateStartDate(action.payload.date);
      recalculateColumns(state);
    },
    resize: state => {
      recalculateColumns(state);
    },
    fetchLeft: (state, action) => {
      state.startDate = calculateStartDate(state.startDate);
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
    },
    fetchRight: (state, action) => {
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
    },
  },
});

function calculateStartDate(date) {
  let result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result.toLocaleDateString("en-CA");
}

function recalculateColumns(state) {
  state.columns = getInitialColumnsAmount(document.documentElement.clientWidth);
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export const { scroll, changeDate, resize, fetchLeft, fetchRight } =
  mainSlice.actions;

export default mainSlice.reducer;
