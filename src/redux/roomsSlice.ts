import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export type Room = {
  floorId: number,
  number: string,
  type: string
};

export type Rooms = {
  [key: number]: Room
};

export type State = {
  data: Rooms,
};

const initialState: State = {
  data: { },
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getCurrentUser.matchPending, (state) => {
        state.data = { };
      })
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        const floors = payload.floors;
        for (const floor of floors) {
          for (const room of floor.rooms) {
            state.data[room.id] = { floorId: room.floorId, number: room.number, type: room.type };
          }
        }
      })
      .addMatcher(api.endpoints.deleteFloor.matchFulfilled, (state, action) => {
        const floorId = action.meta.arg.originalArgs;
        for (const roomId in state.data) {
          const room = state.data[roomId];
          if (room && room.floorId === floorId) {
            delete state.data[roomId];
          }
        }
      })
      .addMatcher(api.endpoints.postRoom.matchFulfilled, (state, { payload }) => {
        state.data[payload.id] = payload;
      })
      .addMatcher(api.endpoints.putRoom.matchFulfilled, (state, { payload }) => {
        state.data[payload.id] = payload;
      })
      .addMatcher(api.endpoints.deleteRoom.matchFulfilled, (state, action) => {
        delete state.data[action.meta.arg.originalArgs];
      });
  }
});

export default roomsSlice.reducer;
