import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ZeroParameterDialog = "police" | "istat" | "cityTax" | "findBooking";

export type DialogDescriptor = {
  type: ZeroParameterDialog
} | {
  type: "booking",
  tile: string
};

export type State = {
  dialogs: DialogDescriptor[]
}

const initialState: State = {
  dialogs: []
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    closeAll: (state) => {
      state.dialogs = [];
    },
    show: (state, action: PayloadAction<{ dialogType: ZeroParameterDialog }>) => {
      state.dialogs.push({ type: action.payload.dialogType });
    },
    showBookingDialog: (state, action: PayloadAction<{ tileId: string }>) => {
      state.dialogs.push({
        type: "booking",
        tile: action.payload.tileId
      });
    }
  }
});

export const { closeAll, show, showBookingDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
