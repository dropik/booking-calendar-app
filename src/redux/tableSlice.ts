import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Utils from "../utils";
import * as Globals from "../globals";

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
  dates: string[]
};

function getInitialState(): State {
  const initialDate = Utils.dateToString(new Date());
  const leftmostDate = Utils.getDateShift(initialDate, -Globals.TABLE_PRELOAD_AMOUNT);
  const columns = getInitialColumnsAmount();
  const dates: string[] = [];
  addDatesOnRight(dates, leftmostDate, 0, columns);

  return {
    leftmostDate: leftmostDate,
    columns: columns,
    offsetHeight: 0,
    clientHeight: 0,
    lastFetchPeriod: {
      from: leftmostDate,
      to: Utils.getDateShift(leftmostDate, columns - 1)
    },
    dates: dates
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
      state.leftmostDate = Utils.getDateShift(action.payload.date, -Globals.TABLE_PRELOAD_AMOUNT);
      state.columns = getInitialColumnsAmount();
      state.lastFetchPeriod = {
        from: state.leftmostDate,
        to: Utils.getDateShift(state.leftmostDate, state.columns - 1)
      };
      state.dates = [];
      addDatesOnRight(state.dates, state.leftmostDate, 0, state.columns);
    },
    expandLeft: (state) => {
      state.leftmostDate = Utils.getDateShift(state.leftmostDate, -Globals.TABLE_PRELOAD_AMOUNT);
      const prevColumns = state.columns;
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
      state.lastFetchPeriod = {
        from: state.leftmostDate,
        to: Utils.getDateShift(state.leftmostDate, Globals.TABLE_PRELOAD_AMOUNT - 1)
      };
      addDatesOnLeft(state.dates, state.leftmostDate, prevColumns, state.columns);
    },
    expandRight: (state) => {
      const prevColumns = state.columns;
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
      state.lastFetchPeriod = {
        from: Utils.getDateShift(state.leftmostDate, state.columns - Globals.TABLE_PRELOAD_AMOUNT),
        to: Utils.getDateShift(state.leftmostDate, state.columns - 1)
      };
      addDatesOnRight(state.dates, state.leftmostDate, prevColumns, state.columns);
    }
  }
});

export const { updateHeights, changeDate, expandLeft, expandRight } = tableSlice.actions;

export default tableSlice.reducer;

function getInitialColumnsAmount() {
  const sidebarWidth = Utils.remToPx(6);
  const tableCellWidth = Utils.remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - sidebarWidth) / tableCellWidth);
  columns += Globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

function addDatesOnLeft(dates: string[], leftmostDate: string, prevColumns: number, columns: number): void {
  const dateCounter = new Date(dates[0]);
  dateCounter.setDate(dateCounter.getDate() - 1);
  for (let i = prevColumns; i < columns; i++) {
    const date = Utils.dateToString(dateCounter);
    dates.splice(0, 0, date);
    dateCounter.setDate(dateCounter.getDate() - 1);
  }
}

function addDatesOnRight(dates: string[], leftmostDate: string, prevColumns: number, newColumns: number): void {
  const dateCounter = new Date(leftmostDate);
  dateCounter.setDate(dateCounter.getDate() + prevColumns + 1);
  for (let i = prevColumns; i < newColumns; i++) {
    const date = Utils.dateToString(dateCounter);
    dates.push(date);
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
}
