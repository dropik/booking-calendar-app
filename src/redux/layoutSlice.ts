import { createSlice } from "@reduxjs/toolkit";

export type State = {
  adjustLayoutRequestId: number
};

const initialState: State = {
  adjustLayoutRequestId: 0
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    addAdjustRequest: (state) => {
      state.adjustLayoutRequestId++;
    }
  }
});

export const { addAdjustRequest } = layoutSlice.actions;

export default layoutSlice.reducer;
