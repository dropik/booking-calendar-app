import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageData = {
  type: "error" | "success" | "info",
  message?: string
};

export type State = {
  message: MessageData,
  show: boolean
};

const initialState: State = {
  message: { type: "error" },
  show: false
};

export const snackbarMessageSlice = createSlice({
  name: "connectionError",
  initialState: initialState,
  reducers: {
    show: (state, action: PayloadAction<MessageData>) => {
      state.message = action.payload;
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    }
  }
});

export const { show, hide } = snackbarMessageSlice.actions;

export default snackbarMessageSlice.reducer;
