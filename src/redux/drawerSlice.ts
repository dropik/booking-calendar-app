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
    toggle: (state) => {
      state.open = !state.open;
    }
  }
});

export const { toggle } = drawerSlice.actions;

export default drawerSlice.reducer;
