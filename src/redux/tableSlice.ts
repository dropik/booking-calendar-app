import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Utils from "../utils";
import * as Globals from "../globals";

export type State = {
  initialDate: string,
  leftmostDate: string,
  columns: number,
  offsetHeight: number,
  clientHeight: number
};

const initialState: State = {
  initialDate: Utils.dateToString(new Date()),
  leftmostDate: calculateLeftmostDate(new Date()),
  columns: getInitialColumnsAmount(),
  offsetHeight: 0,
  clientHeight: 0
};

export const tableSlice = createSlice({
  name: "table",
  initialState: initialState,
  reducers: {
    resize: (state) => {
      state.columns = getInitialColumnsAmount();
    },
    updateHeights: (state, action: PayloadAction<{ offsetHeight: number, clientHeight: number }>) => {
      state.offsetHeight = action.payload.offsetHeight;
      state.clientHeight = action.payload.clientHeight;
    },
    changeDate: (state, action: PayloadAction<{ date: string }>) => {
      state.initialDate = action.payload.date;
      state.leftmostDate = calculateLeftmostDate(action.payload.date);
      state.columns = getInitialColumnsAmount();
    },
    fetchLeft: (state) => {
      state.leftmostDate = calculateLeftmostDate(state.leftmostDate);
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
    },
    fetchRight: (state) => {
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
    }
  }
});

export const { resize, updateHeights, changeDate, fetchLeft, fetchRight } = tableSlice.actions;

export default tableSlice.reducer;

function getInitialColumnsAmount() {
  const roomCellWidth = Utils.remToPx(6);
  const containerWidth = Utils.remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - roomCellWidth) / containerWidth);
  columns += Globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

function calculateLeftmostDate(date: string | Date): string {
  const result = new Date(date);
  result.setDate(result.getDate() - Globals.TABLE_PRELOAD_AMOUNT);
  return Utils.dateToString(result);
}
