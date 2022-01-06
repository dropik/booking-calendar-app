import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  top: number,
  left: number
};

const initialState: State = {
  top: 0,
  left: 0
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<{ top: number, left: number }>) => {
      state.top = action.payload.top;
      state.left = action.payload.left;
    }
  }
});

export const { set } = scrollSlice.actions;

export default scrollSlice.reducer;
