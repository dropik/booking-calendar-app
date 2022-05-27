import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  lastFetchPeriod: FetchPeriod,
  fetchReason: "changeDate" | "expand"
};

function getInitialState(): State {
  const initialDate = Utils.dateToString(new Date());
  const leftmostDate = Utils.getDateShift(initialDate, -3);
  const columns = getInitialColumnsAmount();

  return {
    currentDate: initialDate,
    leftmostDate: leftmostDate,
    columns: columns,
    offsetHeight: 0,
    clientHeight: 0,
    lastFetchPeriod: {
      from: leftmostDate,
      to: Utils.getDateShift(leftmostDate, columns - 1)
    },
    fetchReason: "changeDate"
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
      state.currentDate = action.payload.date;
      state.leftmostDate = Utils.getDateShift(action.payload.date, -3);
      state.columns = getInitialColumnsAmount();
      state.lastFetchPeriod = {
        from: state.leftmostDate,
        to: Utils.getDateShift(state.leftmostDate, state.columns - 1)
      };
      state.fetchReason = "changeDate";
    }
  }
});

export const { updateHeights, changeDate } = tableSlice.actions;

export default tableSlice.reducer;

function getInitialColumnsAmount() {
  return 7;
}
