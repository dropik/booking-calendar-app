import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GrabbedTileState = {
  x: number,
  y: number
};

const initialState: GrabbedTileState = {
  x: -1,
  y: -1
};

export const grabbedTileSlice = createSlice({
  name: "grabbedTile",
  initialState: initialState,
  reducers: {
    grab: (state, action: PayloadAction<{ x: number, y: number }>) => {
      return action.payload;
    },
    drop: () => {
      return initialState;
    }
  }
});

export const { grab, drop } = grabbedTileSlice.actions;

export default grabbedTileSlice.reducer;
