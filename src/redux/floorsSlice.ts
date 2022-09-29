import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchFloorsAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";
import { fetchAsync as fetchRoomsAsync } from "./roomsSlice";

export type Floor = {
  name: string,
  roomIds: string[]
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
      throw thunkApi.rejectWithValue([]);
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
      state.data[floor.id] = { name: floor.name, roomIds: [ ]};
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
    createRoom: (state, action: PayloadAction<{ floorId: string, roomId: string }>) => {
      const room = action.payload;
      const floor = state.data[room.floorId];
      if (floor) {
        floor.roomIds.push(room.roomId);
      }
    },
    deleteRoom: (state, action: PayloadAction<{ floorId: string, roomId: string }>) => {
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
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
        state.data = { };
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const data = action.payload;
        for (const floor of data) {
          if (!state.data[floor.id]) {
            state.data[floor.id] = { name: floor.name, roomIds: [] };
          } else {
            state.data[floor.id].name = floor.name;
          }
        }
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        const rooms = action.payload;
        for (const room of rooms) {
          if (!state.data[room.floorId]) {
            state.data[room.floorId] = { name: "", roomIds: [] };
          }
          state.data[room.floorId].roomIds.push(room.id);
        }
      });
  }
});

export const { createFloor, editFloor, deleteFloor, createRoom, deleteRoom } = floorsSlice.actions;

export default floorsSlice.reducer;