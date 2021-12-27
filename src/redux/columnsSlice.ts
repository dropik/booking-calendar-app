import { createSlice } from "@reduxjs/toolkit";

import * as globals from "../globals";
import * as utils from "../utils";

export type ColumnsState = {
  value: number
};

const initialState: ColumnsState = {
  value: getColumnsAmount()
};

function getColumnsAmount() {
  const roomCellWidth = utils.remToPx(6);
  const containerWidth = utils.remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
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
      state.value += globals.TABLE_PRELOAD_AMOUNT;
    },
    "fetchRight": (state) => {
      state.value += globals.TABLE_PRELOAD_AMOUNT;
    }
  }
});

export default columnsSlice.reducer;
