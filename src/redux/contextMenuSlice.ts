import { createSlice } from "@reduxjs/toolkit";

export type State = {
  isShown: boolean,
};

const initialState: State = {
  isShown: false
};

export const contextMenuSlice = createSlice({
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

export const { show, hide } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
