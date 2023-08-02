import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { Utils } from "../utils";

export type FetchPeriod = {
  from: string,
  to: string
};

export type State = {
  leftmostDate: string,
  columns: number,
  offsetHeight: number,
  clientHeight: number,
  lastFetchPeriod: FetchPeriod,
  scrollLeft: number,
};

function getInitialState(): State {
  const dateObj = new Date();
  const leftmostDate = Utils.dateToString(dateObj);
  const columns = getColumnsAmount();

  return {
    leftmostDate: leftmostDate,
    columns: columns,
    offsetHeight: 0,
    clientHeight: 0,
    lastFetchPeriod: {
      from: leftmostDate,
      to: Utils.getDateShift(leftmostDate, columns - 1)
    },
    scrollLeft: 0,
  };
}

export const tableSlice = createSlice({
  name: "table",
  initialState: getInitialState,
  reducers: {
    updateHeights: (state, action: PayloadAction<{ offsetHeight: number, clientHeight: number }>) => {
      state.offsetHeight = action.payload.offsetHeight;
      state.clientHeight = action.payload.clientHeight;
    },
    changeDate: (state, action: PayloadAction<{ date: string }>) => {
      updateStateByNewDate(state, action.payload.date);
    },
    goNext: (state) => {
      updateStateByNewDate(state, Utils.getDateShift(state.leftmostDate, state.columns));
    },
    goPrev: (state) => {
      updateStateByNewDate(state, Utils.getDateShift(state.leftmostDate, -state.columns));
    },
    scrollX: (state, action: PayloadAction<number>) => {
      state.scrollLeft = action.payload;
      if (state.scrollLeft < 0) {
        state.scrollLeft = 0;
      }
    }
  }
});

export const { updateHeights, changeDate, goNext, goPrev, scrollX } = tableSlice.actions;

export default tableSlice.reducer;

function updateStateByNewDate(state: WritableDraft<State>, date: string): void {
  state.leftmostDate = date;
  state.columns = getColumnsAmount();
  state.lastFetchPeriod.from = state.leftmostDate,
  state.lastFetchPeriod.to = Utils.getDateShift(state.leftmostDate, state.columns - 1);
}

function getColumnsAmount(): number {
  return 30;
}
