import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  tileId: number | undefined,
  x: string,
  y: number,
  initialPageY: number,
  top: number
};

const initialState: State = {
  tileId: undefined,
  x: "",
  y: -1,
  initialPageY: 0,
  top: 0
};

export const grabbedTileSlice = createSlice({
  name: "grabbedTile",
  initialState: initialState,
  reducers: {
    grab: (state, action: PayloadAction<{ tileId: number, x: string, y: number, pageY: number }>) => {
      state.tileId = action.payload.tileId;
      state.x = action.payload.x;
      state.y = action.payload.y;
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
