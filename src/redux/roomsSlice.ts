import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAsync as fetchCurrentUserAction } from "./userSlice";

export type Room = {
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
  reducers: {
    setRoom: (state, action: PayloadAction<{ id: number, room: Room}>) => {
      state.data[action.payload.id] = action.payload.room;
    },
    deleteRooms: (state, action: PayloadAction<{ ids: number[] }>) => {
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
      .addCase(fetchCurrentUserAction.pending, (state) => {
        state.data = { };
      })
      .addCase(fetchCurrentUserAction.fulfilled, (state, action) => {
        const floors = action.payload.floors;
        for (const floor of floors) {
          for (const room of floor.rooms) {
            state.data[room.id] = { number: room.number, type: room.type };
          }
        }
      });
  }
});

export const { setRoom, deleteRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
