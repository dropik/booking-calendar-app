import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";
import { ackBookingsAsync, AckBookingsRequest, Booking, ColorAssignments, fetchBookingsBySessionAsync, postColorAssignments } from "../api";
import { show as showMessage } from "./snackbarMessageSlice";
import { fetchAsync as fetchFloorsAsync } from "./floorsSlice";
import { FetchPeriod } from "./tableSlice";
import { RootState } from "./store";

export type TileColor = "booking1" | "booking2" | "booking3" | "booking4" | "booking5" | "booking6" | "booking7" | "booking8";

export type TileData = {
  id: string,
  bookingId: string,
  name: string,
  from: string,
  nights: number,
  roomType: string,
  persons: number,
  color: TileColor,
  roomId?: number
};

export type RoomChanges = {
  [key: string]: {
    originalRoom?: number,
    newRoom?: number
  }
};

export type ColorChanges = {
  [key: string]: {
    originalColor: TileColor,
    newColor: TileColor
  }
};

type ColoredBooking = Required<Booking<number>>;

export type State = {
  status: "idle" | "loading" | "failed",
  data: {
    [key: string]: TileData
  },
  assignedMap: {
    [key: number]: {
      [key: string]: string | undefined
    }
  },
  unassignedMap: {
    [key: string]: {
      [key: string]: string
    }
  },
  grabbedMap: {
    [key: string]: boolean
  },
  bookingsMap: {
    [key: string]: string[]
  },
  roomChanges: RoomChanges,
  colorChanges: ColorChanges,
  grabbedTile?: string,
  mouseYOnGrab: number,
  sessionId?: string
};

const initialState: State = {
  status: "idle",
  data: { },
  assignedMap: { },
  unassignedMap: { },
  grabbedMap: { },
  bookingsMap: { },
  roomChanges: { },
  colorChanges: { },
  mouseYOnGrab: 0
};

export const fetchAsync = createAsyncThunk<{ bookings: ColoredBooking[], sessionId: string }, FetchPeriod>(
  "bookings-by-session/fetch",
  async (arg: FetchPeriod, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const response = await fetchBookingsBySessionAsync(arg.from, arg.to, state.tiles.sessionId);
      const bookings = response.data.bookings;
      const coloredBookings: ColoredBooking[] = [];

      const ackRequest: AckBookingsRequest = {
        bookings: [],
        sessionId: response.data.sessionId
      };
      const assignments: ColorAssignments = { };

      for (const booking of bookings) {
        if (!booking.color) {
          const newColor = `booking${Math.floor((Math.random() * 7)) + 1}` as TileColor;
          assignments[booking.id] = newColor;
          coloredBookings.push({ color: newColor, ...booking });
        } else {
          coloredBookings.push({ color: booking.color, ...booking });
        }

        ackRequest.bookings.push({
          bookingId: booking.id,
          lastModified: booking.lastModified
        });
      }

      if (Object.keys(assignments).length > 0) {
        await postColorAssignments(assignments);
      }

      if (ackRequest.bookings.length > 0) {
        await ackBookingsAsync(ackRequest);
      }
      return { bookings: coloredBookings, sessionId: response.data.sessionId };
    } catch(error) {
      thunkApi.dispatch(showMessage({ type: "error" }));
      throw thunkApi.rejectWithValue([]);
    }
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const tilesSlice = createSlice({
  name: "tiles",
  initialState: initialState,
  reducers: {
    move: (state, action: PayloadAction<{ newY: number }>) => {
      tryMoveTile(state, action);
      if (state.grabbedTile) {
        checkRoomReturnedToOriginal(state, state.grabbedTile);
      }
    },
    grab: (state, action: PayloadAction<{ tileId: string, mouseY: number }>) => {
      state.grabbedTile = action.payload.tileId;
      state.grabbedMap[action.payload.tileId] = true;
      state.mouseYOnGrab = action.payload.mouseY;

      const tile = state.data[action.payload.tileId];
      for (const roomId in state.assignedMap) {
        let revert = false;
        const dateCounter = new Date(tile.from);
        for (let i = 0; i < tile.nights; i++) {
          const x = Utils.dateToString(dateCounter);
          dateCounter.setDate(dateCounter.getDate() + 1);
          if (!state.assignedMap[roomId][x]) {
            state.assignedMap[roomId][x] = "dropzone";
          } else {
            revert = true;
            dateCounter.setDate(dateCounter.getDate() - 2);
            break;
          }
        }

        if (revert) {
          let x = Utils.dateToString(dateCounter);
          while (Utils.daysBetweenDates(tile.from, x) >= 0) {
            state.assignedMap[roomId][x] = undefined;
            dateCounter.setDate(dateCounter.getDate() - 1);
            x = Utils.dateToString(dateCounter);
          }
        }
      }
    },
    drop: (state, action: PayloadAction<{ tileId: string }>) => {
      state.grabbedTile = undefined;
      state.grabbedMap[action.payload.tileId] = false;
      state.mouseYOnGrab = 0;

      const tile = state.data[action.payload.tileId];
      for (const roomId in state.assignedMap) {
        if (state.assignedMap[roomId][tile.from] === "dropzone") {
          const dateCounter = new Date(tile.from);
          for (let i = 0; i < tile.nights; i++) {
            const x = Utils.dateToString(dateCounter);
            dateCounter.setDate(dateCounter.getDate() + 1);
            state.assignedMap[roomId][x] = undefined;
          }
        }
      }
    },
    unassign: (state, action: PayloadAction<{ tileId: string }>) => {
      tryRemoveAssignment(state, action);
      checkRoomReturnedToOriginal(state, action.payload.tileId);
    },
    saveChanges: (state) => {
      state.roomChanges = { };
      state.colorChanges = { };
    },
    undoChanges: (state) => {
      unassignChangedTiles(state);
      reassignTiles(state);
      reassignColors(state);
    },
    setColor: (state, action: PayloadAction<{ tileId: string, color: TileColor }>) => {
      const bookingId = state.data[action.payload.tileId].bookingId;

      if (!state.colorChanges[bookingId]) {
        state.colorChanges[bookingId] = {
          originalColor: state.data[action.payload.tileId].color,
          newColor: action.payload.color
        };
      } else {
        state.colorChanges[bookingId].newColor = action.payload.color;
      }

      state.bookingsMap[bookingId].forEach((tileId) => {
        state.data[tileId].color = action.payload.color;
      });

      if (state.colorChanges[bookingId].originalColor === state.colorChanges[bookingId].newColor) {
        delete state.colorChanges[bookingId];
      }
    },
    createRoom: (state, action: PayloadAction<number>) => {
      const newRoom = action.payload;
      if (!state.assignedMap[newRoom]) {
        state.assignedMap[newRoom] = { };
      }
    },
    deleteRooms: (state, action: PayloadAction<number[]>) => {
      const rooms = action.payload;
      for (const roomId of rooms) {
        const room = state.assignedMap[roomId];
        if (room) {
          for (const date in room) {
            const tileId = room[date];
            if (tileId) {
              const tile = state.data[tileId];
              if (tile) {
                tile.roomId = undefined;
                const dateCounter = new Date(tile.from);
                for (let i = 0; i < tile.nights; i++) {
                  const x = Utils.dateToString(dateCounter);
                  if (!state.unassignedMap[x]) {
                    state.unassignedMap[x] = { };
                  }
                  state.unassignedMap[x][tileId] = tileId;
                  dateCounter.setDate(dateCounter.getDate() + 1);
                }
              }
              delete room[date];
            }
          }
          delete state.assignedMap[roomId];
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
        addFetchedBookings(state, action.payload.bookings);
        state.sessionId = action.payload.sessionId;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchFloorsAsync.fulfilled, (state, action) => {
        action.payload.forEach((floor) => {
          floor.rooms.forEach((room) => {
            if (!state.assignedMap[room.id]) {
              state.assignedMap[room.id] = { };
            }
          });
        });
      });
  }
});

export const { move, grab, drop, unassign, saveChanges, undoChanges, setColor, createRoom, deleteRooms } = tilesSlice.actions;

export default tilesSlice.reducer;

function addFetchedBookings(state: WritableDraft<State>, bookings: ColoredBooking[]): void {
  for (const booking of bookings) {
    // remove all previous tiles and changes if booking was already fetched
    if (state.bookingsMap[booking.id]) {
      const previousTiles = state.bookingsMap[booking.id];
      for (const tileId of previousTiles) {
        const tile = state.data[tileId];
        const roomId = tile.roomId;
        const dateCounter = new Date(tile.from);
        if (roomId !== undefined) {
          for (let i = 0; i < tile.nights; i++) {
            const x = Utils.dateToString(dateCounter);
            state.assignedMap[roomId][x] = undefined;
            dateCounter.setDate(dateCounter.getDate() + 1);
          }
        } else {
          for (let i = 0; i < tile.nights; i++) {
            const x = Utils.dateToString(dateCounter);
            delete state.unassignedMap[x][tileId];
            dateCounter.setDate(dateCounter.getDate() + 1);
          }
        }
        if (state.roomChanges[tileId]) {
          delete state.roomChanges[tileId];
        }
        delete state.data[tileId];
      }
      delete state.bookingsMap[booking.id];
      if (state.colorChanges[booking.id]) {
        delete state.colorChanges[booking.id];
      }
    }

    // assign new tiles
    if (booking.status === "cancelled") {
      continue;
    }

    state.bookingsMap[booking.id] = [];
    for (const tile of booking.tiles) {
      const newTile: TileData = {
        id: tile.id,
        bookingId: booking.id,
        name: booking.name,
        from: tile.from,
        nights: tile.nights,
        roomType: tile.roomType,
        persons: tile.persons,
        color: booking.color,
        roomId: tile.roomId
      };

      state.data[newTile.id] = newTile;
      state.grabbedMap[newTile.id] = false;
      state.bookingsMap[booking.id].push(newTile.id);
      const roomId = newTile.roomId;
      const dateCounter = new Date(newTile.from);
      if (roomId !== undefined) {
        if (state.assignedMap[roomId] === undefined) {
          state.assignedMap[roomId] = {};
        }
        for (let i = 0; i < newTile.nights; i++) {
          state.assignedMap[roomId][Utils.dateToString(dateCounter)] = newTile.id;
          dateCounter.setDate(dateCounter.getDate() + 1);
        }
      } else {
        for (let i = 0; i < newTile.nights; i++) {
          const x = Utils.dateToString(dateCounter);
          if (state.unassignedMap[x] === undefined) {
            state.unassignedMap[x] = { };
          }
          state.unassignedMap[x][newTile.id] = newTile.id;
          dateCounter.setDate(dateCounter.getDate() + 1);
        }
      }
    }
  }
}

function tryMoveTile(
  state: WritableDraft<State>,
  action: PayloadAction<{ newY: number }>
): void {
  if (!state.grabbedTile) {
    return;
  }

  const tileId = state.grabbedTile;
  const prevY = state.data[tileId].roomId;
  const newY = action.payload.newY;

  if (newY !== prevY) {
    if (state.assignedMap[newY] === undefined) {
      state.assignedMap[newY] = { };
      moveOrAssignTile(state, tileId, prevY, newY);
    } else if (!checkHasCollision(state, tileId, newY)) {
      moveOrAssignTile(state, tileId, prevY, newY);
    }
  }
}

function tryRemoveAssignment(state: WritableDraft<State>, action: PayloadAction<{ tileId: string }>): void {
  const tileId = action.payload.tileId;
  const tileData = state.data[tileId];
  const roomId = tileData.roomId;
  if (roomId !== undefined) {
    const dateCounter = new Date(tileData.from);
    for (let i = 0; i < tileData.nights; i++) {
      const x = Utils.dateToString(dateCounter);
      state.assignedMap[roomId][x] = undefined;
      if (state.unassignedMap[x] === undefined) {
        state.unassignedMap[x] = { };
      }
      state.unassignedMap[x][tileId] = tileId;
      dateCounter.setDate(dateCounter.getDate() + 1);
    }

    saveRoomChange(state, tileId, tileData.roomId, undefined);
    tileData.roomId = undefined;
  }
}

function unassignChangedTiles(state: WritableDraft<State>): void {
  for (const tileId of Object.keys(state.roomChanges)) {
    const tileData = state.data[tileId];
    const newRoom = state.roomChanges[tileId].newRoom;

    if (newRoom !== undefined) {
      state.data[tileId].roomId = undefined;
      const dateCounter = new Date(tileData.from);
      for (let i = 0; i < tileData.nights; i++) {
        const x = Utils.dateToString(dateCounter);
        state.assignedMap[newRoom][x] = undefined;
        if (!state.unassignedMap[x]) {
          state.unassignedMap[x] = { };
        }
        state.unassignedMap[x][tileId] = tileId;
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    }
  }
}

function reassignTiles(state: WritableDraft<State>): void {
  for (const tileId of Object.keys(state.roomChanges)) {
    const tileData = state.data[tileId];
    const originalRoom = state.roomChanges[tileId].originalRoom;

    if (originalRoom !== undefined) {
      state.data[tileId].roomId = originalRoom;
      const dateCounter = new Date(tileData.from);
      for (let i = 0; i < tileData.nights; i++) {
        const x = Utils.dateToString(dateCounter);
        if (!state.assignedMap[originalRoom]) {
          state.assignedMap[originalRoom] = { };
        }
        state.assignedMap[originalRoom][x] = tileId;
        delete state.unassignedMap[x][tileId];
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    }
  }
  state.roomChanges = { };
}

function reassignColors(state: WritableDraft<State>): void {
  for (const bookingId of Object.keys(state.colorChanges)) {
    const tileIds = state.bookingsMap[bookingId];
    const change = state.colorChanges[bookingId];
    for (const tileId of tileIds) {
      state.data[tileId].color = change.originalColor;
    }
  }
  state.colorChanges = { };
}

function checkRoomReturnedToOriginal(state: WritableDraft<State>, tileId: string): void {
  if (state.roomChanges[tileId] && (state.roomChanges[tileId].originalRoom === state.roomChanges[tileId].newRoom)) {
    delete state.roomChanges[tileId];
  }
}

function moveOrAssignTile(state: WritableDraft<State>, tileId: string, prevY: number | undefined, newY: number): void {
  if (prevY !== undefined) {
    moveTile(state, tileId, prevY, newY);
  } else {
    assignTile(state, tileId, newY);
  }
}

function moveTile(
  state: WritableDraft<State>,
  tileId: string,
  prevY: number,
  newY: number
): void {
  const tileData = state.data[tileId];
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    state.assignedMap[newY][x] = tileId;
    state.assignedMap[prevY][x] = undefined;
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  saveRoomChange(state, tileId, state.data[tileId].roomId, newY);
  state.data[tileId].roomId = newY;
}

function checkHasCollision(
  state: WritableDraft<State>,
  tileId: string,
  newY: number
): boolean {
  const tileData = state.data[tileId];
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    if ((state.assignedMap[newY][x] !== undefined) && (state.assignedMap[newY][x] !== "dropzone")) {
      return true;
    }
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return false;
}

function assignTile(state: WritableDraft<State>, tileId: string, newY: number): void {
  const tileData = state.data[tileId];
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    state.assignedMap[newY][x] = tileId;
    delete state.unassignedMap[x][tileId];
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  saveRoomChange(state, tileId, state.data[tileId].roomId, newY);
  state.data[tileId].roomId = newY;
}

function saveRoomChange(state: WritableDraft<State>, tileId: string, prevY: number | undefined, newY: number | undefined): void {
  if (!state.roomChanges[tileId]) {
    state.roomChanges[tileId] = {
      originalRoom: prevY
    };
  }
  state.roomChanges[tileId].newRoom = newY;
}
