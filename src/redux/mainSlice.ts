import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { remToPx, daysBetweenDates } from "../utils";
import globals from "../globals";
import mocks from "../mocks";

export type TileData = {
  roomNumber: number,
  from: string,
  colour: string,
  nights: number,
  name: string,
  roomType: string
};

export type MainState = {
  currentDate: string,
  startDate: string,
  tiles: TileData[],
  occupations: (number | undefined)[][]
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initState(),
  reducers: {
    move: (state, action: PayloadAction<{ x: number, y: number, newY: number }>) => {
      moveOccupation(state, action);
    }
  },
  extraReducers: {
    "scroll": (state, action: PayloadAction<{ top: number, left: number }>) => {
      const cellWidth = remToPx(4) + 1;
      const dateShift = Math.floor(
        (action.payload.left + cellWidth / 2) / cellWidth
      );
      const newDate = new Date(state.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = newDate.toLocaleDateString("en-CA");
    },
    "changeDate": (state, action: PayloadAction<{ date: string, tiles: TileData[] }>) => {
      state.currentDate = action.payload.date;
      state.startDate = calculateStartDate(action.payload.date);
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    "fetchLeft": (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.startDate = calculateStartDate(state.startDate);
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    "fetchRight": (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    }
  }
});

function initState(): MainState {
  const currentDate = (new Date()).toLocaleDateString("en-CA");
  const startDate = calculateStartDate(currentDate);
  const tiles = mocks.tiles;

  return {
    currentDate: currentDate,
    startDate: startDate,
    tiles: tiles,
    occupations: recalculateOccupations(tiles, startDate)
  };
}

function calculateStartDate(date: string) {
  const result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result.toLocaleDateString("en-CA");
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
    const x = daysBetweenDates(startDate, fromDate.toLocaleDateString("en-CA"));
    row[x] = index;
    occupations[roomNumber] = row;
  });
  return occupations;
}

function moveOccupation(state: WritableDraft<MainState>, action: PayloadAction<{ x: number, y: number, newY: number }>) {
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

export const { move } =
  mainSlice.actions;

export default mainSlice.reducer;
