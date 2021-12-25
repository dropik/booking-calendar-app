import { createSlice } from "@reduxjs/toolkit";

import globals from "../globals";
import { remToPx } from "../utils";

export type ColumnsState = {
  value: number
};

const initialState: ColumnsState = {
  value: getColumnsAmount()
};

function getColumnsAmount() {
  const roomCellWidth = remToPx(6);
  const containerWidth = remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export const columnsSlice = createSlice({
  name: "columns",
  initialState: initialState,
  reducers: {
    resize: state => {
      state.value = getColumnsAmount();
    }
  },
  extraReducers: {
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

export const { resize } = columnsSlice.actions;

export default columnsSlice.reducer;
