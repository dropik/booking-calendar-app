import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  value?: string
};

const initialState: State = { };

export const hoveredIdSlice = createSlice({
  name: "mouse",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
    }
  }
});

export const { set } = hoveredIdSlice.actions;

export default hoveredIdSlice.reducer;
