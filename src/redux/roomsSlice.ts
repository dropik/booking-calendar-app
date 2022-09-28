import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRoomsAsync } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";

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

export const fetchAsync = createAsyncThunk(
  "rooms/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetchRoomsAsync();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue([]);
    }
  }
);

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
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
        state.data = { };
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const rooms = action.payload;
        for (const room of rooms) {
          state.data[room.id] = { number: room.number, type: room.type };
        }
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { setRoom, deleteRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
