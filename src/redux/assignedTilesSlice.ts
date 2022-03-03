import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";
import * as TilesSlice from "./tilesSlice";

export type TileDataUpdate = {
  id: string,
  newRoomNumber: number
};

export type State = {
  grabbedX?: string,
  grabbedY?: number,
  lastUpdate?: TileDataUpdate,
  [key: number]: {
    [key: string]: string | undefined
  }
};

const initialState: State = { };

export const assignedTilesSlice = createSlice({
  name: "assignedTiles",
  initialState: initialState,
  reducers: {
    move: (state, action: PayloadAction<{ newY: number }>) => {
      tryMoveTile(state, action);
    },
    grab: (state, action: PayloadAction<{ x: string, y: number }>) => {
      state.grabbedX = action.payload.x;
      state.grabbedY = action.payload.y;
    },
    drop: (state) => {
      state.grabbedX = undefined;
      state.grabbedY = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(TilesSlice.fetchAsync.fulfilled, (state, action: PayloadAction<TilesSlice.TileData[]>) => {
      addFetchedTiles(state, action.payload);
    });
  }
});

export const { move, grab, drop } = assignedTilesSlice.actions;

export default assignedTilesSlice.reducer;

function addFetchedTiles(state: WritableDraft<State>, tiles: TilesSlice.TileData[]): void {
  tiles.forEach(tile => {
    const roomNumber = tile.roomNumber;
    if (state[roomNumber] === undefined) {
      state[roomNumber] = {};
    }
    const dateCounter = new Date(tile.from);
    for (let i = 0; i < tile.nights; i++) {
      state[roomNumber][Utils.dateToString(dateCounter)] = tile.id;
      dateCounter.setDate(dateCounter.getDate() + 1);
    }
  });
}

function tryMoveTile(
  state: WritableDraft<State>,
  action: PayloadAction<{ newY: number }>
): void {
  if (!state.grabbedX || !state.grabbedY) {
    return;
  }

  const tileId = state[state.grabbedY][state.grabbedX];
  if (tileId === undefined) {
    return;
  }

  const newY = action.payload.newY;

  if (newY && (newY !== state.grabbedY)) {
    if (state[newY] === undefined) {
      state[newY] = {};
      moveTile(state, tileId, state.grabbedX, state.grabbedY, newY);
    } else if (!checkHasCollision(state, tileId, state.grabbedX, state.grabbedY, newY)) {
      moveTile(state, tileId, state.grabbedX, state.grabbedY, newY);
    }
  }
}

function moveTile(
  state: WritableDraft<State>,
  tileId: string,
  startX: string,
  prevY: number,
  newY: number
): void {
  // go backwards from grabbed x
  let dateCounter = new Date(startX);
  let x = Utils.dateToString(dateCounter);
  while (state[prevY][x] === tileId) {
    state[prevY][x] = undefined;
    state[newY][x] = tileId;
    dateCounter.setDate(dateCounter.getDate() - 1);
    x = Utils.dateToString(dateCounter);
  }

  // go forward from grabbed x
  dateCounter = new Date(startX);
  dateCounter.setDate(dateCounter.getDate() + 1);
  x = Utils.dateToString(dateCounter);
  while (state[prevY][x] === tileId) {
    state[prevY][x] = undefined;
    state[newY][x] = tileId;
    dateCounter.setDate(dateCounter.getDate() + 1);
    x = Utils.dateToString(dateCounter);
  }

  state.lastUpdate = {
    id: tileId,
    newRoomNumber: newY
  };
}

function checkHasCollision(
  state: WritableDraft<State>,
  tileId: string,
  startX: string,
  prevY: number,
  newY: number
): boolean {
  // go backwards from grabbed x
  let dateCounter = new Date(startX);
  let x = Utils.dateToString(dateCounter);
  while (state[prevY][x] === tileId) {
    if (state[newY][x] !== undefined) {
      return true;
    }
    dateCounter.setDate(dateCounter.getDate() - 1);
    x = Utils.dateToString(dateCounter);
  }

  // go forward from grabbed x
  dateCounter = new Date(startX);
  dateCounter.setDate(dateCounter.getDate() + 1);
  x = Utils.dateToString(dateCounter);
  while (state[prevY][x] === tileId) {
    if (state[newY][x] !== undefined) {
      return true;
    }
    dateCounter.setDate(dateCounter.getDate() + 1);
    x = Utils.dateToString(dateCounter);
  }

  return false;
}
