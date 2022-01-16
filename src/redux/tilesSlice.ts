import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Api from "../api";

import * as TableSlice from "./tableSlice";

export type TileData = {
  roomNumber: number,
  from: string,
  colour: string,
  nights: number,
  name: string,
  roomType: string
};

export type State = {
  status: "idle" | "loading" | "failed",
  data: TileData[],
  [key: number]: {
    [key: string]: TileData | undefined
  }
};

const initialState: State = {
  status: "idle",
  data: []
};

export const fetchAsync = createAsyncThunk(
  "occupations/fetch",
  async (arg: TableSlice.FetchPeriod) => {
    const response = await Api.fetchTilesAsync(arg.from, arg.to);
    return response.data;
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

export const occupationsSlice = createSlice({
  name: "occupations",
  initialState: initialState,
  reducers: {
    move: (state, action: PayloadAction<{ x: string, y: number, newY: number }>) => {
      moveOccupation(state, action);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action: PayloadAction<TileData[]>) => {
        state.status = "idle";
        addFetchedOccupations(state, action.payload);
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { move } = occupationsSlice.actions;

export default occupationsSlice.reducer;

function addFetchedOccupations(state: State, tiles: Array<TileData>): void {
  tiles.forEach(tile => {
    const roomNumber = tile.roomNumber;
    if (state[roomNumber] === undefined) {
      state[roomNumber] = {};
    }
    state[roomNumber][tile.from] = tile;
    state.data.push(tile);
  });
}

function moveOccupation(
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
  }
}
