import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ScrollState = {
  top: number,
  left: number
};

const initialState: ScrollState = {
  top: 0,
  left: 0
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    "scroll": (state, action: PayloadAction<{ top: number, left: number }>) => {
      state.top = action.payload.top;
      state.left = action.payload.left;
    }
  }
});

export default scrollSlice.reducer;
