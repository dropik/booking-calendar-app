import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as utils from "../utils";
import * as globals from "../globals";
import * as api from "../api";

export type TileData = {
  roomNumber: number,
  from: string,
  colour: string,
  nights: number,
  name: string,
  roomType: string
};

export type TableState = {
  initialDate: string,
  currentDate: string,
  leftmostDate: string,
  tiles: TileData[],
  status: "idle" | "loading" | "failed",
  occupations: (number | undefined)[][]
};

export const fetchTilesAsync = createAsyncThunk(
  "table/fetchTiles",
  async () => {
    const response = await api.fetchTilesAsync();
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
      const cellWidth = utils.remToPx(4) + 1;
      const dateShift = Math.floor(
        (action.payload.left + cellWidth / 2) / cellWidth
      );
      const newDate = new Date(state.leftmostDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = utils.dateToString(newDate);
    },
    "changeDate": (state, action: PayloadAction<{ date: string, tiles: TileData[] }>) => {
      state.initialDate = action.payload.date;
      state.currentDate = action.payload.date;
      state.leftmostDate = calculateLeftmostDate(action.payload.date);
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.leftmostDate);
    },
    "fetchLeft": (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.leftmostDate = calculateLeftmostDate(state.leftmostDate);
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.leftmostDate);
    },
    "fetchRight": (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.leftmostDate);
    },
    "move": (state, action: PayloadAction<{ x: number, y: number, newY: number }>) => {
      moveOccupation(state, action);
    },
    "table/fetchTiles/pending": (state) => {
      state.status = "loading";
    },
    "table/fetchTiles/fulfilled": (state, action: PayloadAction<TileData[]>) => {
      state.status = "idle";
      state.tiles = action.payload;
      state.occupations = recalculateOccupations(state.tiles, state.leftmostDate);
    },
    "table/fetchTiles/rejected": (state) => {
      state.status = "failed";
    }
  }
});

function initState(): TableState {
  const currentDate = utils.dateToString(new Date());
  const leftmostDate = calculateLeftmostDate(currentDate);

  return {
    initialDate: currentDate,
    currentDate: currentDate,
    leftmostDate: leftmostDate,
    tiles: [],
    status: "idle",
    occupations: recalculateOccupations([], leftmostDate)
  };
}

function calculateLeftmostDate(date: string) {
  const result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return utils.dateToString(result);
}

function recalculateOccupations(tiles: Array<TileData>, startDate: string) {
  const occupations = Array<Array<number>>();
  tiles.forEach((tile, index) => {
    const roomNumber = tile.roomNumber;
    let row = occupations[roomNumber];
    if (row === undefined) {
      row = [];
    }
    const fromDate = new Date(tile.from);
    const x = utils.daysBetweenDates(startDate, utils.dateToString(fromDate));
    row[x] = index;
    occupations[roomNumber] = row;
  });
  return occupations;
}

function moveOccupation(state: WritableDraft<TableState>, action: PayloadAction<{ x: number, y: number, newY: number }>) {
  const prevY = action.payload.y;
  const x = action.payload.x;
  const newY = action.payload.newY;

  if ((newY > 0) && (newY != prevY)) {
    if (state.occupations[newY] === undefined) {
      state.occupations[newY] = [];
    }
    state.occupations[newY][x] = state.occupations[prevY][x];
    state.occupations[prevY][x] = undefined;

    state.tiles[state.occupations[newY][x] as number].roomNumber = newY;
  }
}

export default tableSlice.reducer;
