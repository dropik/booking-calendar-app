import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export type Floor = {
  id: number,
  name: string,
};

export type Floors = {
  [key: number]: Floor
};

export type State = {
  data: Floors,
};

const initialState: State = {
  data: { },
};

export const floorsSlice = createSlice({
  name: "floors",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        for (const floor of payload.floors) {
          state.data[floor.id] = { id: floor.id, name: floor.name, };
        }
      })
      .addMatcher(api.endpoints.postFloor.matchFulfilled, (state, { payload }) => {
        state.data[payload.id] = { id: payload.id, name: payload.name, };
      })
      .addMatcher(api.endpoints.putFloor.matchFulfilled, (state, { payload }) => {
        if (state.data[payload.id]) {
          state.data[payload.id].name = payload.name;
        }
      })
      .addMatcher(api.endpoints.deleteFloor.matchFulfilled, (state, action) => {
        const id = action.meta.arg.originalArgs;
        if (state.data[id]) {
          delete state.data[id];
        }
      });
  }
});

export default floorsSlice.reducer;
