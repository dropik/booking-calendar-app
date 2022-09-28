import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAsync as fetchFloorsAsync } from "./floorsSlice";

export type Room = {
  number: string,
  type: string
};

export type Rooms = {
  [key: string]: Room
};

export type State = {
  data: Rooms,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: { },
  status: "idle"
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<{ id: string, room: Room}>) => {
      state.data[action.payload.id] = action.payload.room;
    },
    deleteRooms: (state, action: PayloadAction<{ ids: string[] }>) => {
      const rooms = action.payload.ids;
      for (const roomId of rooms) {
        if (state.data[roomId]) {
          delete state.data[roomId];
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFloorsAsync.pending, (state) => {
        state.status = "loading";
        state.data = { };
      })
      .addCase(fetchFloorsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const floors = action.payload;
        for (const floor of floors) {
          const rooms = floor.rooms;
          for (const room of rooms) {
            state.data[room.id] = { number: room.number, type: room.type };
          }
        }
      })
      .addCase(fetchFloorsAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { setRoom, deleteRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
