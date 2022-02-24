import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  x: number,
  y: number
};

export type MousePosition = {
  x: number,
  y: number
};

const initialState: State = {
  x: 0,
  y: 0
};

export const mouseSlice = createSlice({
  name: "mouse",
  initialState: initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<MousePosition>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    }
  }
});

export const { updatePosition } = mouseSlice.actions;

export default mouseSlice.reducer;
