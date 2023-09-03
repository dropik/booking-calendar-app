import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type State = {
  accessToken: string,
  refreshToken: string,
};

const initialState: State = {
  accessToken: window.localStorage.getItem("accessToken") ?? "",
  refreshToken: window.localStorage.getItem("refreshToken") ?? "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<State>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.localStorage.setItem("accessToken", action.payload.accessToken);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;
