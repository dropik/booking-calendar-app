import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ZeroParameterDialog = "police" | "istat" | "cityTax" | "findBooking" | "findClient";

export type DialogDescriptor = {
  type: ZeroParameterDialog
} | {
  type: "booking",
  id: string
} | {
  type: "booking",
  tile: string
} | {
  type: "client",
  bookingId: string,
  clientId: string
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
    showBookingDialog: (state, action: PayloadAction<{ id: string } | { tileId: string }>) => {
      if ("id" in action.payload) {
        state.dialogs.push({
          type: "booking",
          id: action.payload.id
        });
      } else {
        state.dialogs.push({
          type: "booking",
          tile: action.payload.tileId
        });
      }
    },
    showClientDialog: (state, action: PayloadAction<{ bookingId: string, clientId: string }>) => {
      state.dialogs.push({
        type: "client",
        bookingId: action.payload.bookingId,
        clientId: action.payload.clientId
      });
    }
  }
});

export const { closeAll, goBack, show, showBookingDialog, showClientDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
