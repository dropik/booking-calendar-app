import { createSlice } from "@reduxjs/toolkit";

export type State = {
  showed: boolean
};

const initialState: State = {
  showed: false
};

export const sidemenuSlice = createSlice({
  name: "sidemenu",
  initialState: initialState,
  reducers: {
    show: (state) => {
      state.showed = true;
    },
    hide: (state) => {
      state.showed = false;
    }
  }
});

export const { show, hide } = sidemenuSlice.actions;

export default sidemenuSlice.reducer;
