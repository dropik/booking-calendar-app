import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type State = {
  adjustLayoutRequestId: number,
  surfaceDim: boolean,
};

const initialState: State = {
  adjustLayoutRequestId: 0,
  surfaceDim: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    addAdjustRequest: (state) => {
      state.adjustLayoutRequestId++;
    },
    setSurfaceDim: (state, action: PayloadAction<boolean>) => {
      state.surfaceDim = action.payload;
    },
  }
});

export const { addAdjustRequest, setSurfaceDim } = layoutSlice.actions;

export default layoutSlice.reducer;
