import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  offsetHeight: number,
  clientHeight: number
};

const initialState: State = {
  offsetHeight: 0,
  clientHeight: 0
};

export const tableDimentionsSlice = createSlice({
  name: "tableDimentions",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<State>) => {
      return action.payload;
    }
  }
});

export const { set } = tableDimentionsSlice.actions;

export default tableDimentionsSlice.reducer;
