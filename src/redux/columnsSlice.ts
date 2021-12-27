import { createSlice } from "@reduxjs/toolkit";

import * as Globals from "../globals";
import * as Utils from "../utils";

export type State = {
  value: number
};

const initialState: State = {
  value: getColumnsAmount()
};

function getColumnsAmount() {
  const roomCellWidth = Utils.remToPx(6);
  const containerWidth = Utils.remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - roomCellWidth) / containerWidth);
  columns += Globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export const columnsSlice = createSlice({
  name: "columns",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    "resize": state => {
      state.value = getColumnsAmount();
    },
    "changeDate": (state) => {
      state.value = getColumnsAmount();
    },
    "fetchLeft": (state) => {
      state.value += Globals.TABLE_PRELOAD_AMOUNT;
    },
    "fetchRight": (state) => {
      state.value += Globals.TABLE_PRELOAD_AMOUNT;
    }
  }
});

export default columnsSlice.reducer;
