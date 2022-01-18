import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Api from "../api";
import * as Utils from "../utils";

import * as TableSlice from "./tableSlice";

export type TileData = {
  roomNumber: number,
  from: string,
  colour: string,
  nights: number,
  name: string,
  roomType: string,
  persons: number
};

export type State = {
  status: "idle" | "loading" | "failed",
  data: TileData[],
  [key: number]: {
    [key: string]: number | undefined
  }
};

const initialState: State = {
  status: "idle",
  data: []
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
    move: (state, action: PayloadAction<{ x: string, y: number, newY: number }>) => {
      moveTile(state, action);
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

export const { move } = tilesSlice.actions;

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

function moveTile(
  state: WritableDraft<State>,
  action: PayloadAction<{ x: string, y: number, newY: number }>
): void {
  const prevY = action.payload.y;
  const x = action.payload.x;
  const newY = action.payload.newY;

  if ((newY > 0) && (newY != prevY)) {
    if (state[newY] === undefined) {
      state[newY] = {};
    }
    state[newY][x] = state[prevY][x];
    state[prevY][x] = undefined;
    state.data[state[newY][x] as number].roomNumber = newY;
  }
}
