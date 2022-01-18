import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  tileId: number | undefined,
  x: string,
  y: number,
  initialPageY: number
};

const initialState: State = {
  tileId: undefined,
  x: "",
  y: -1,
  initialPageY: 0
};

export const grabbedTileSlice = createSlice({
  name: "grabbedTile",
  initialState: initialState,
  reducers: {
    grab: (state, action: PayloadAction<State>) => {
      return action.payload;
    },
    drop: () => {
      return initialState;
    }
  }
});

export const { grab, drop } = grabbedTileSlice.actions;

export default grabbedTileSlice.reducer;
