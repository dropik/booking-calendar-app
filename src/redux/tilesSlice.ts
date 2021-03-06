import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Api from "../api";
import * as Utils from "../utils";

import * as TableSlice from "./tableSlice";

export type TileData = {
  id: string,
  bookingId: string,
  name: string,
  from: string,
  nights: number,
  roomType: string,
  entity: string,
  persons: number,
  colour: string,
  roomNumber?: number
};

export type ChangesMap = {
  [key: string]: {
    roomChanged: boolean,
    originalRoom?: number,
    newRoom?: number,
    originalColour?: string,
    newColour?: string
  }
};

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
  changesMap: ChangesMap,
  grabbedTile?: string,
  selectedDate?: string
  mouseYOnGrab: number
};

const initialState: State = {
  status: "idle",
  data: { },
  assignedMap: { },
  unassignedMap: { },
  grabbedMap: { },
  bookingsMap: { },
  changesMap: { },
  mouseYOnGrab: 0
};

export const fetchAsync = createAsyncThunk(
  "tiles/fetch",
  async (arg: TableSlice.FetchPeriod) => {
    const response = await Api.fetchTilesAsync(arg.from, arg.to);
    return response.data;
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
        checkChangeReturnedToOriginal(state, state.grabbedTile);
      }
    },
    grab: (state, action: PayloadAction<{ tileId: string, mouseY: number }>) => {
      state.grabbedTile = action.payload.tileId;
      state.grabbedMap[action.payload.tileId] = true;
      state.mouseYOnGrab = action.payload.mouseY;
    },
    drop: (state, action: PayloadAction<{ tileId: string }>) => {
      state.grabbedTile = undefined;
      state.grabbedMap[action.payload.tileId] = false;
      state.mouseYOnGrab = 0;
    },
    toggleDate: (state, action: PayloadAction<{ date: string | undefined }>) => {
      state.selectedDate = state.selectedDate === action.payload.date ? undefined : action.payload.date;
    },
    removeAssignment: (state, action: PayloadAction<{ tileId: string }>) => {
      tryRemoveAssignment(state, action);
      checkChangeReturnedToOriginal(state, action.payload.tileId);
    },
    saveChanges: (state) => {
      state.changesMap = { };
    },
    undoChanges: (state) => {
      unassignChangedTiles(state);
      reassignTiles(state);
    },
    setColour: (state, action: PayloadAction<{ tileId: string, colour: string }>) => {
      const booking = state.data[action.payload.tileId].bookingId;
      state.bookingsMap[booking].forEach((tileId) => {
        if (state.changesMap[tileId] === undefined) {
          state.changesMap[tileId] = {
            roomChanged: false,
            originalColour: state.data[tileId].colour
          };
        } else if (state.changesMap[tileId].originalColour === undefined) {
          state.changesMap[tileId].originalColour = state.data[tileId].colour;
        }
        state.changesMap[tileId].newColour = action.payload.colour;
        state.data[tileId].colour = action.payload.colour;
        checkChangeReturnedToOriginal(state, tileId);
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        addFetchedTiles(state, action.payload);
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { move, grab, drop, toggleDate, removeAssignment, saveChanges, undoChanges, setColour } = tilesSlice.actions;

export default tilesSlice.reducer;

function addFetchedTiles(state: WritableDraft<State>, tiles: TileData[]): void {
  tiles.forEach(tile => {
    state.data[tile.id] = tile;
    state.grabbedMap[tile.id] = false;
    if (state.bookingsMap[tile.bookingId] === undefined) {
      state.bookingsMap[tile.bookingId] = [];
    }
    state.bookingsMap[tile.bookingId].push(tile.id);
    const roomNumber = tile.roomNumber;
    if (roomNumber !== undefined) {
      if (state.assignedMap[roomNumber] === undefined) {
        state.assignedMap[roomNumber] = {};
      }
      const dateCounter = new Date(tile.from);
      for (let i = 0; i < tile.nights; i++) {
        state.assignedMap[roomNumber][Utils.dateToString(dateCounter)] = tile.id;
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    } else {
      const dateCounter = new Date(tile.from);
      for (let i = 0; i < tile.nights; i++) {
        const x = Utils.dateToString(dateCounter);
        if (state.unassignedMap[x] === undefined) {
          state.unassignedMap[x] = { };
        }
        state.unassignedMap[x][tile.id] = tile.id;
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    }
  });
}

function tryMoveTile(
  state: WritableDraft<State>,
  action: PayloadAction<{ newY: number }>
): void {
  if (!state.grabbedTile) {
    return;
  }

  const tileId = state.grabbedTile;
  const prevY = state.data[tileId].roomNumber;
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
  const roomNumber = tileData.roomNumber;
  if (roomNumber) {
    const dateCounter = new Date(tileData.from);
    for (let i = 0; i < tileData.nights; i++) {
      const x = Utils.dateToString(dateCounter);
      state.assignedMap[roomNumber][x] = undefined;
      if (state.unassignedMap[x] === undefined) {
        state.unassignedMap[x] = { };
      }
      state.unassignedMap[x][tileId] = tileId;
      dateCounter.setDate(dateCounter.getDate() + 1);
    }

    saveRoomChange(state, tileId, tileData.roomNumber, undefined);
    tileData.roomNumber = undefined;
  }
}

function unassignChangedTiles(state: WritableDraft<State>): void {
  for (const tileId of Object.keys(state.changesMap)) {
    const tileData = state.data[tileId];
    const newRoom = state.changesMap[tileId].newRoom;

    if (newRoom !== undefined) {
      state.data[tileId].roomNumber = undefined;
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
  for (const tileId of Object.keys(state.changesMap)) {
    const tileData = state.data[tileId];
    const originalRoom = state.changesMap[tileId].originalRoom;

    if (originalRoom !== undefined) {
      state.data[tileId].roomNumber = originalRoom;
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

    const originalColour = state.changesMap[tileId].originalColour;
    if (originalColour) {
      state.data[tileId].colour = originalColour;
    }

    delete state.changesMap[tileId];
  }
}

function checkChangeReturnedToOriginal(state: WritableDraft<State>, tileId: string): void {
  if (
    state.changesMap[tileId] &&
    (state.changesMap[tileId].originalRoom === state.changesMap[tileId].newRoom) &&
    (state.changesMap[tileId].originalColour === state.changesMap[tileId].newColour)
  ) {
    delete state.changesMap[tileId];
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

  saveRoomChange(state, tileId, state.data[tileId].roomNumber, newY);
  state.data[tileId].roomNumber = newY;
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
    if (state.assignedMap[newY][x] !== undefined) {
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

  saveRoomChange(state, tileId, state.data[tileId].roomNumber, newY);
  state.data[tileId].roomNumber = newY;
}

function saveRoomChange(state: WritableDraft<State>, tileId: string, prevY: number | undefined, newY: number | undefined): void {
  if (!state.changesMap[tileId]) {
    state.changesMap[tileId] = {
      roomChanged: true,
      originalRoom: prevY
    };
  } else if (!state.changesMap[tileId].roomChanged) {
    state.changesMap[tileId].roomChanged = true;
    state.changesMap[tileId].originalRoom = prevY;
  }
  state.changesMap[tileId].newRoom = newY;
}
