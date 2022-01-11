import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  x: string,
  y: number
};

const initialState: State = {
  x: "",
  y: -1
};

export const grabbedTileSlice = createSlice({
  name: "grabbedTile",
  initialState: initialState,
  reducers: {
    grab: (state, action: PayloadAction<{ x: string, y: number }>) => {
      return action.payload;
    },
    drop: () => {
      return initialState;
    }
  }
});

export const { grab, drop } = grabbedTileSlice.actions;

export default grabbedTileSlice.reducer;
