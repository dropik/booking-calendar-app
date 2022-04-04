import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  hoveredId?: string,
  x: number,
  y: number
};

const initialState: State = {
  x: 0,
  y: 0
};

export const occupationInfoSlice = createSlice({
  name: "hoveredId",
  initialState: initialState,
  reducers: {
    show: (state, action: PayloadAction<{ hoveredId: string, x: number, y: number }>) => {
      state.hoveredId = action.payload.hoveredId;
    },
    move: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    hide: (state) => {
      state.hoveredId = undefined;
    }
  }
});

export const { show, move, hide } = occupationInfoSlice.actions;

export default occupationInfoSlice.reducer;
