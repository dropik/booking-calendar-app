import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";
import * as Globals from "../globals";
import * as Api from "../api";
import * as Store from "./store";

export type TileData = {
  roomNumber: number,
  from: string,
  colour: string,
  nights: number,
  name: string,
  roomType: string
};

type Occupations = {
  [key: number]: {
    [key: string]: (number | undefined)
  }
};

export type State = {
  initialDate: string,
  currentDate: string,
  leftmostDate: string,
  tiles: TileData[],
  status: "idle" | "loading" | "failed",
  occupations: Occupations
};

export const fetchTilesAsync = createAsyncThunk(
  "table/fetchTiles",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as Store.RootState;
    const from = state.table.leftmostDate;
    const to = calculateRightmostDate(from, state.columns.value);
    const response = await Api.fetchTilesAsync(from, to);
    return response.data;
  }
);

export type FetchTilesAsyncAction = ReturnType<typeof fetchTilesAsync>;

export const tableSlice = createSlice({
  name: "table",
  initialState: initState(),
  reducers: {},
  extraReducers: {
    "scroll": (state, action: PayloadAction<{ top: number, left: number }>) => {
      const cellWidth = Utils.remToPx(4) + 1;
      const dateShift = Math.floor(
        (action.payload.left + cellWidth / 2) / cellWidth
      );
      const newDate = new Date(state.leftmostDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = Utils.dateToString(newDate);
    },
    "changeDate": (state, action: PayloadAction<{ date: string }>) => {
      state.initialDate = action.payload.date;
      state.currentDate = action.payload.date;
      state.leftmostDate = calculateLeftmostDate(action.payload.date);
    },
    "fetchLeft": (state) => {
      state.leftmostDate = calculateLeftmostDate(state.leftmostDate);
    },
    "move": (state, action: PayloadAction<{ x: string, y: number, newY: number }>) => {
      moveOccupation(state, action);
    },
    "table/fetchTiles/pending": (state) => {
      state.status = "loading";
    },
    "table/fetchTiles/fulfilled": (state, action: PayloadAction<TileData[]>) => {
      state.status = "idle";
      state.tiles = action.payload;
      state.occupations = recalculateOccupations(state.tiles);
    },
    "table/fetchTiles/rejected": (state) => {
      state.status = "failed";
    }
  }
});

function initState(): State {
  const currentDate = Utils.dateToString(new Date());
  const leftmostDate = calculateLeftmostDate(currentDate);

  return {
    initialDate: currentDate,
    currentDate: currentDate,
    leftmostDate: leftmostDate,
    tiles: [],
    status: "idle",
    occupations: recalculateOccupations([])
  };
}

function calculateLeftmostDate(date: string): string {
  const result = new Date(date);
  result.setDate(result.getDate() - Globals.TABLE_PRELOAD_AMOUNT);
  return Utils.dateToString(result);
}

function calculateRightmostDate(leftmostDate: string, columns: number): string {
  const result = new Date(leftmostDate);
  result.setDate(result.getDate() + columns);
  return Utils.dateToString(result);
}

function recalculateOccupations(tiles: Array<TileData>): Occupations {
  const occupations: Occupations = [];
  tiles.forEach((tile, index) => {
    const roomNumber = tile.roomNumber;
    let row = occupations[roomNumber];
    if (row === undefined) {
      row = {};
    }
    row[tile.from] = index;
    occupations[roomNumber] = row;
  });
  return occupations;
}

function moveOccupation(
  state: WritableDraft<State>,
  action: PayloadAction<{ x: string, y: number, newY: number }>
): void {
  const prevY = action.payload.y;
  const x = action.payload.x;
  const newY = action.payload.newY;

  if ((newY > 0) && (newY != prevY)) {
    if (state.occupations[newY] === undefined) {
      state.occupations[newY] = {};
    }
    state.occupations[newY][x] = state.occupations[prevY][x];
    state.occupations[prevY][x] = undefined;

    state.tiles[state.occupations[newY][x] as number].roomNumber = newY;
  }
}

export default tableSlice.reducer;
