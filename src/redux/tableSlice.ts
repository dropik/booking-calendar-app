import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";

export type FetchPeriod = {
  from: string,
  to: string
};

export type State = {
  currentDate: string,
  leftmostDate: string,
  columns: number,
  offsetHeight: number,
  clientHeight: number,
  lastFetchPeriod: FetchPeriod
};

function getInitialState(): State {
  const dateObj = new Date();
  const initialDate = Utils.dateToString(dateObj);
  const columns = getColumnsAmount(dateObj);
  dateObj.setDate(1);
  const leftmostDate = Utils.dateToString(dateObj);

  return {
    currentDate: initialDate,
    leftmostDate: leftmostDate,
    columns: columns,
    offsetHeight: 0,
    clientHeight: 0,
    lastFetchPeriod: {
      from: leftmostDate,
      to: Utils.getDateShift(leftmostDate, columns - 1)
    }
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
      updateStateByNewDate(state, Utils.getDateShift(state.currentDate, state.columns));
    },
    goPrev: (state) => {
      updateStateByNewDate(state, Utils.getDateShift(state.currentDate, -state.columns));
    }
  }
});

export const { updateHeights, changeDate, goNext, goPrev } = tableSlice.actions;

export default tableSlice.reducer;

function updateStateByNewDate(state: WritableDraft<State>, date: string): void {
  state.currentDate = date;
  const dateObj = new Date(date);
  state.columns = getColumnsAmount(dateObj);
  dateObj.setDate(1);
  state.leftmostDate = Utils.dateToString(dateObj);
  state.lastFetchPeriod.from = state.leftmostDate,
  state.lastFetchPeriod.to = Utils.getDateShift(state.leftmostDate, state.columns - 1);
}

function getColumnsAmount(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
