import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogType = "police" | "istat" | "cityTax";

export type State = {
  selectedDialog?: DialogType
}

const initialState: State = { };

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    hide: (state) => {
      state.selectedDialog = undefined;
    },
    show: (state, action: PayloadAction<{ dialogType: DialogType }>) => {
      state.selectedDialog = action.payload.dialogType;
    }
  }
});

export const { hide, show } = dialogSlice.actions;

export default dialogSlice.reducer;
