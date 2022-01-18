import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  tileId: number | undefined,
  initialPageY: number,
  top: number
};

const initialState: State = {
  tileId: undefined,
  initialPageY: 0,
  top: 0
};

export const grabbedTileSlice = createSlice({
  name: "grabbedTile",
  initialState: initialState,
  reducers: {
    grab: (state, action: PayloadAction<{ tileId: number, pageY: number }>) => {
      state.tileId = action.payload.tileId;
      state.initialPageY = action.payload.pageY;
    },
    drag: (state, action: PayloadAction<{ pageY: number }>) => {
      state.top = action.payload.pageY - state.initialPageY;
    },
    drop: () => {
      return initialState;
    }
  }
});

export const { grab, drag, drop } = grabbedTileSlice.actions;

export default grabbedTileSlice.reducer;
