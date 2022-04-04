import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ZeroParameterDialog = "police" | "istat" | "cityTax" | "findBooking";

export type DialogDescriptor = {
  type: ZeroParameterDialog
} | {
  type: "booking",
  id?: string,
  tile?: string,
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
    goBack: (state) => {
      state.dialogs.pop();
    },
    show: (state, action: PayloadAction<{ dialogType: ZeroParameterDialog }>) => {
      state.dialogs.push({ type: action.payload.dialogType });
    },
    showBookingDialog: (state, action: PayloadAction<{ id?: string, tileId?: string }>) => {
      state.dialogs.push({
        type: "booking",
        id: action.payload.id,
        tile: action.payload.tileId
      });
    }
  }
});

export const { closeAll, goBack, show, showBookingDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
