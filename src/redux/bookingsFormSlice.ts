import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Utils } from "../utils";

export type State = {
  from: string,
  to: string,
  name: string
};

const initialState: State = {
  from: Utils.dateToString(new Date()),
  to: Utils.getDateShift(new Date(), 1),
  name: ""
};

export const bookingsFormSlice = createSlice({
  name: "bookingsForm",
  initialState: initialState,
  reducers: {
    setBookingsFormFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setBookingsFormTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    setBookingsFormName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export const { setBookingsFormFrom, setBookingsFormTo, setBookingsFormName } = bookingsFormSlice.actions;

export default bookingsFormSlice.reducer;
