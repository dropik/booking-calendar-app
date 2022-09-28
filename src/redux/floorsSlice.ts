import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchFloorsAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";

export type Room = {
  number: number,
  type: string
};

export type Rooms = {
  [key: string]: Room
};

export type Floor = {
  name: string,
  rooms: Rooms
};

export type Floors = {
  [key: string]: Floor
};

export type State = {
  data: Floors,
  status: "idle" | "loading" | "failed"
};

const initialState: State = {
  data: { },
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "floors/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetchFloorsAsync();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue({});
    }
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const floorsSlice = createSlice({
  name: "floors",
  initialState: initialState,
  reducers: {
    createFloor: (state, action: PayloadAction<{ id: string, name: string }>) => {
      const floor = action.payload;
      state.data[floor.id] = { name: floor.name, rooms: { }};
    },
    editFloor: (state, action: PayloadAction<{ id: string, name: string }>) => {
      const floor = action.payload;
      if (state.data[floor.id]) {
        state.data[floor.id].name = floor.name;
      }
    },
    deleteFloor: (state, action: PayloadAction<string>) => {
      if (state.data[action.payload]) {
        delete state.data[action.payload];
      }
    },
    createRoom: (state, action: PayloadAction<{ id: string, floorId: string, number: number, type: string }>) => {
      const room = action.payload;
      const floor = state.data[room.floorId];
      if (floor) {
        floor.rooms[room.id] = { number: room.number, type: room.type };
      }
    },
    editRoom: (state, action: PayloadAction<{ id: string, floorId: string, number: number, type: string }>) => {
      const newRoom = action.payload;
      const floor = state.data[newRoom.floorId];
      if (floor) {
        const room = floor.rooms[newRoom.id];
        if (room) {
          room.number = newRoom.number;
          room.type = newRoom.type;
        }
      }
    },
    deleteRoom: (state, action: PayloadAction<{ id: string, floorId: string }>) => {
      const room = action.payload;
      const floor = state.data[room.floorId];
      if (floor) {
        if (floor.rooms[room.id]) {
          delete floor.rooms[room.id];
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = { };
        const data = action.payload;
        for (const floor of data) {
          const rooms: Rooms = { };
          for (const room of floor.rooms) {
            rooms[room.id] = { number: room.number, type: room.type };
          }
          state.data[floor.id] = { name: floor.name, rooms };
        }
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { createFloor, editFloor, deleteFloor, createRoom, editRoom, deleteRoom } = floorsSlice.actions;

export default floorsSlice.reducer;
