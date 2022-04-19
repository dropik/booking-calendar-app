import { createSlice } from "@reduxjs/toolkit";

export type State = {
  isShown: boolean,
};

const initialState: State = {
  isShown: false
};

export const poppersSlice = createSlice({
  name: "contextMenu",
  initialState: initialState,
  reducers: {
    show: (state) => {
      state.isShown = true;
    },
    hide: (state) => {
      state.isShown = false;
    }
  }
});

export const { show, hide } = poppersSlice.actions;

export default poppersSlice.reducer;
