import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  top: number
};

const initialState: State = {
  top: 0
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<{ top: number }>) => {
      state.top = action.payload.top;
    }
  }
});

export const { set } = scrollSlice.actions;

export default scrollSlice.reducer;
