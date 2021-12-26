import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TableDimentionsState = {
  offsetHeight: number,
  clientHeight: number
};

const initialState: TableDimentionsState = {
  offsetHeight: 0,
  clientHeight: 0
};

export const tableDimentionsSlice = createSlice({
  name: "tableDimentions",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<TableDimentionsState>) => {
      return action.payload;
    }
  }
});

export const { set } = tableDimentionsSlice.actions;

export default tableDimentionsSlice.reducer;
