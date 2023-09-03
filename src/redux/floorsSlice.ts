/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";

export type Floor = {
  name: string,
  roomIds: number[]
};

export type Floors = {
  [key: number]: Floor
};

export type State = {
  data: Floors,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: { },
  status: "idle"
};

export const floorsSlice = createSlice({
  name: "floors",
  initialState: initialState,
  reducers: {
    createFloor: (state, action: PayloadAction<{ id: number, name: string }>) => {
      const floor = action.payload;
      state.data[floor.id] = { name: floor.name, roomIds: [ ]};
    },
    editFloor: (state, action: PayloadAction<{ id: number, name: string }>) => {
      const floor = action.payload;
      if (state.data[floor.id]) {
        state.data[floor.id].name = floor.name;
      }
    },
    deleteFloor: (state, action: PayloadAction<number>) => {
      if (state.data[action.payload]) {
        delete state.data[action.payload];
      }
    },
    createRoom: (state, action: PayloadAction<{ floorId: number, roomId: number }>) => {
      const room = action.payload;
      const floor = state.data[room.floorId];
      if (floor) {
        floor.roomIds.push(room.roomId);
      }
    },
    deleteRoom: (state, action: PayloadAction<{ floorId: number, roomId: number }>) => {
      const room = action.payload;
      const floor = state.data[room.floorId];
      if (floor) {
        const index = floor.roomIds.indexOf(room.roomId);
        if (index > -1) {
          floor.roomIds.splice(index, 1);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getCurrentUser.matchPending, (state) => {
        state.status = "loading";
        state.data = { };
      })
      .addMatcher(api.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.status = "idle";
        for (const floor of payload.floors) {
          state.data[floor.id] = { name: floor.name, roomIds: floor.rooms.map((room) => room.id) };
        }
      })
      .addMatcher(api.endpoints.getCurrentUser.matchRejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { createFloor, editFloor, deleteFloor, createRoom, deleteRoom } = floorsSlice.actions;

export default floorsSlice.reducer;
