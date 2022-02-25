import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  x: number,
  y: number,
  hoveredId: number | undefined,
  isGrabbing: boolean
};

export type MousePosition = {
  x: number,
  y: number
};

const initialState: State = {
  x: 0,
  y: 0,
  hoveredId: undefined,
  isGrabbing: false
};

export const mouseSlice = createSlice({
  name: "mouse",
  initialState: initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<MousePosition>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    setHoveredId: (state, action: PayloadAction<number | undefined>) => {
      state.hoveredId = action.payload;
    },
    grab: (state) => {
      state.isGrabbing = true;
    },
    drop: (state) => {
      state.isGrabbing = false;
    }
  }
});

export const { updatePosition, setHoveredId, grab, drop } = mouseSlice.actions;

export default mouseSlice.reducer;
