import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogType = "police" | "istat" | "cityTax" | "booking";

export type State = {
  selectedDialog?: DialogType,
  selectedTile?: string
}

const initialState: State = { };

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    hide: (state) => {
      state.selectedDialog = undefined;
      state.selectedTile = undefined;
    },
    show: (state, action: PayloadAction<{ dialogType: DialogType }>) => {
      state.selectedDialog = action.payload.dialogType;
    },
    showBookingDialog: (state, action: PayloadAction<{ tileId: string }>) => {
      state.selectedDialog = "booking";
      state.selectedTile = action.payload.tileId;
    }
  }
});

export const { hide, show, showBookingDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
