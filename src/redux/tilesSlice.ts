import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Api from "../api";
import * as Utils from "../utils";

import * as TableSlice from "./tableSlice";

export type TileData = {
  name: string,
  from: string,
  nights: number,
  roomType: string,
  entity: string,
  persons: number,
  colour: string,
  roomNumber: number,
  grabbed?: boolean
};

export type State = {
  status: "idle" | "loading" | "failed",
  data: TileData[],
  grabbedTile: number,
  grabbedX?: string,
  [key: number]: {
    [key: string]: number | undefined
  }
};

const initialState: State = {
  status: "idle",
  data: [],
  grabbedTile: -1
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
    },
    grab: (state, action: PayloadAction<{ tileId: number, x: string }>) => {
      state.data[action.payload.tileId].grabbed = true;
      state.grabbedTile = action.payload.tileId;
      state.grabbedX = action.payload.x;
    },
    drop: (state, action: PayloadAction<{ tileId: number }>) => {
      state.data[action.payload.tileId].grabbed = false;
      state.grabbedTile = -1;
      state.grabbedX = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action: PayloadAction<TileData[]>) => {
        state.status = "idle";
        addFetchedTiles(state, action.payload);
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { move, grab, drop } = tilesSlice.actions;

export default tilesSlice.reducer;

function addFetchedTiles(state: State, tiles: Array<TileData>): void {
  tiles.forEach(tile => {
    const roomNumber = tile.roomNumber;
    if (state[roomNumber] === undefined) {
      state[roomNumber] = {};
    }
    const dateCounter = new Date(tile.from);
    for (let i = 0; i < tile.nights; i++) {
      state[roomNumber][Utils.dateToString(dateCounter)] = state.data.length;
      dateCounter.setDate(dateCounter.getDate() + 1);
    }
    state.data.push(tile);
  });
}

function tryMoveTile(
  state: WritableDraft<State>,
  action: PayloadAction<{ newY: number }>
): void {
  const tileId = state.grabbedTile;

  if (tileId < 0) {
    return;
  }

  const tileData = state.data[tileId];
  const newY = action.payload.newY;

  if (newY && (newY != tileData.roomNumber)) {
    if (state[newY] === undefined) {
      state[newY] = {};
      moveTile(state, tileData, tileId, newY);
    } else if (!checkHasCollision(state, tileData, newY)) {
      moveTile(state, tileData, tileId, newY);
    }
  }
}

function moveTile(
  state: WritableDraft<State>,
  tileData: WritableDraft<TileData>,
  tileId: number,
  newY: number
): void {
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    state[newY][x] = tileId;
    state[tileData.roomNumber][x] = undefined;
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
  tileData.roomNumber = newY;
}

function checkHasCollision(
  state: WritableDraft<State>,
  tileData: WritableDraft<TileData>,
  newY: number
): boolean {
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    if (state[newY][x] !== undefined) {
      return true;
    }
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
  return false;
}
