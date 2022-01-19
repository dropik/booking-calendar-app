import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  tileId: number | undefined
};

const initialState: State = {
  tileId: undefined
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
