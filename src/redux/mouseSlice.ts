import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  hoveredId: string | undefined
};

const initialState: State = {
  hoveredId: undefined
};

export const mouseSlice = createSlice({
  name: "mouse",
  initialState: initialState,
  reducers: {
    setHoveredId: (state, action: PayloadAction<string | undefined>) => {
      state.hoveredId = action.payload;
    }
  }
});

export const { setHoveredId } = mouseSlice.actions;

export default mouseSlice.reducer;
