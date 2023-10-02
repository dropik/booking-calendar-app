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
  isPanoramicView: boolean,
};

function getInitialState(): State {
  const dateObj = new Date();
  const leftmostDate = Utils.dateToString(dateObj);
  const initialColumns = 30;

  return {
    leftmostDate: leftmostDate,
    columns: initialColumns,
    offsetHeight: 0,
    clientHeight: 0,
    lastFetchPeriod: {
      from: leftmostDate,
      to: Utils.getDateShift(leftmostDate, initialColumns - 1),
    },
    scrollLeft: 0,
    isPanoramicView: false,
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
    updateColums: (state, action: PayloadAction<{ columns: number }>) => {
      state.columns = action.payload.columns;
      state.lastFetchPeriod.to = Utils.getDateShift(state.leftmostDate, state.columns - 1);
    },
    scrollX: (state, action: PayloadAction<number>) => {
      state.scrollLeft = action.payload;
      if (state.scrollLeft < 0) {
        state.scrollLeft = 0;
      }
    },
    togglePanoramicView: (state) => {
      state.isPanoramicView = !state.isPanoramicView;
    },
  }
});

export const { updateHeights, changeDate, goNext, goPrev, updateColums, scrollX, togglePanoramicView } = tableSlice.actions;

export default tableSlice.reducer;

function updateStateByNewDate(state: WritableDraft<State>, date: string): void {
  state.leftmostDate = date;
  state.lastFetchPeriod.from = state.leftmostDate,
  state.lastFetchPeriod.to = Utils.getDateShift(state.leftmostDate, state.columns - 1);
}
