import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Store from "./store";
import * as Api from "../api";
import * as Utils from "../utils";

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
  [key: number]: {
    [key: string]: TileData | undefined
  }
};

const initialState: State = {
  status: "idle"
};

export const fetchAsync = createAsyncThunk(
  "occupations/fetch",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as Store.RootState;
    const from = state.table.leftmostDate;
    const to = calculateRightmostDate(from, state.table.columns);
    const response = await Api.fetchTilesAsync(from, to);
    return response.data;
  }
);

export type FetchAsyncAction = ReturnType<typeof fetchAsync>;

function calculateRightmostDate(leftmostDate: string | Date, columns: number): string {
  return Utils.getDateShift(leftmostDate, columns);
}

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
    let row = state[roomNumber];
    if (row === undefined) {
      row = {};
    }
    row[tile.from] = tile;
    state[roomNumber] = row;
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
