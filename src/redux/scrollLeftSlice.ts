import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type State = {
  value: number,
};

const initialState: State = {
  value: 0,
};

export const scrollLeftSlice = createSlice({
  name: "scrollLeft",
  initialState: initialState,
  reducers: {
    setScrollLeft: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      if (state.value < 0) {
        state.value = 0;
      }
    }
  }
});

export const { setScrollLeft } = scrollLeftSlice.actions;

export default scrollLeftSlice.reducer;
