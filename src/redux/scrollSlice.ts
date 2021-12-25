import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ScrollState = {
  top: number,
  left: number
};

const initialState: ScrollState = {
  top: 0,
  left: 0
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: initialState,
  reducers: {
    apply: (state, action: PayloadAction<{ top: number, left: number }>) => {
      state.top = action.payload.top;
      state.left = action.payload.left;
    }
  }
});

export const { apply } = scrollSlice.actions;

export default scrollSlice.reducer;
