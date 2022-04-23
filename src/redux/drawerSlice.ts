import { createSlice } from "@reduxjs/toolkit";

export type State = {
  open: boolean
};

const initialState: State = {
  open: false
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    }
  }
});

export const { open, close } = drawerSlice.actions;

export default drawerSlice.reducer;
