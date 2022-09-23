import { createSlice } from "@reduxjs/toolkit";

export type State = {
  show: boolean
};

const initialState: State = {
  show: false
};

export const snackbarMessageSlice = createSlice({
  name: "connectionError",
  initialState: initialState,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    }
  }
});

export const { show, hide } = snackbarMessageSlice.actions;

export default snackbarMessageSlice.reducer;
