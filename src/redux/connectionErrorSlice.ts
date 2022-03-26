import { createSlice } from "@reduxjs/toolkit";

export type State = {
  showError: boolean
};

const initialState: State = {
  showError: false
};

export const connectionErrorSlice = createSlice({
  name: "connectionError",
  initialState: initialState,
  reducers: {
    show: (state) => {
      state.showError = true;
    },
    hide: (state) => {
      state.showError = false;
    }
  }
});

export const { show, hide } = connectionErrorSlice.actions;

export default connectionErrorSlice.reducer;
