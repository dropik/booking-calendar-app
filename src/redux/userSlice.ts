/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUserAsync } from "../api";

export type User = {
  username: string,
  visibleName: string,
};

const initialState: User = {
  username: "",
  visibleName: "",
};

export const fetchAsync = createAsyncThunk(
  "users/current",
  async (_, thunkApi) => {
    try {
      const response = await fetchCurrentUserAsync();
      return response.data;
    } catch (error: any) {
      throw thunkApi.rejectWithValue({});
    }
  }
);

export type FetchCurrentUserAction = ReturnType<typeof fetchAsync>;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.visibleName = action.payload.visibleName;
      });
  }
});

export default userSlice.reducer;
