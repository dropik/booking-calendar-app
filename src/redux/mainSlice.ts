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

export type RoomData = {
  number: number,
  type: string
};

export type FloorData = {
  name: string,
  rooms: RoomData[]
};

export type HotelData = {
  floors: FloorData[]
};

export type MainState = {
  currentDate: string,
  startDate: string,
  columns: number,
  scrollLeft: number,
  tiles: TileData[],
  hotel: HotelData,
  occupations: (number | undefined)[][]
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initState(),
  reducers: {
    scroll: (state, action: PayloadAction<{ scrollLeft: number }>) => {
      const cellWidth = remToPx(4) + 1;
      const dateShift = Math.floor(
        (action.payload.scrollLeft + cellWidth / 2) / cellWidth
      );
      const newDate = new Date(state.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = newDate.toLocaleDateString("en-CA");
      state.scrollLeft = action.payload.scrollLeft;
    },
    changeDate: (state, action: PayloadAction<{ date: string, tiles: TileData[] }>) => {
      state.startDate = calculateStartDate(action.payload.date);
      state.columns = recalculateColumns();
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    resize: state => {
      state.columns = recalculateColumns();
    },
    fetchLeft: (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.startDate = calculateStartDate(state.startDate);
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    fetchRight: (state, action: PayloadAction<{ tiles: TileData[] }>) => {
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    move: (state, action) => {
      moveOccupation(state, action);
    }
  },
});

function initState(): MainState {
  const currentDate = (new Date()).toLocaleDateString("en-CA");
  const startDate = calculateStartDate(currentDate);
  const tiles = mocks.tiles;

  return {
    currentDate: currentDate,
    startDate: startDate,
    columns: getInitialColumnsAmount(document.documentElement.clientWidth),
    scrollLeft: 0,
    tiles: tiles,
    hotel: mocks.hotel,
    occupations: recalculateOccupations(tiles, startDate)
  };
}

function calculateStartDate(date: string) {
  const result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result.toLocaleDateString("en-CA");
}

function recalculateColumns() {
  return getInitialColumnsAmount(document.documentElement.clientWidth);
}

function getInitialColumnsAmount(width: number) {
  const roomCellWidth = remToPx(6);
  const containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
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

function moveOccupation(state: WritableDraft<MainState>, action: PayloadAction<{ pageY: number, y: number, x: number }>) {
  const margin = remToPx(8) + 1;
  const tableY = action.payload.pageY - margin;
  const rowHeight = remToPx(4) + 1;
  let targetRow = Math.floor(tableY / rowHeight);
  const prevY = action.payload.y;
  const x = action.payload.x;
  let newY = -1;

  const floors = state.hotel.floors;
  const length = floors.length;
  for (let i = 0; i < length; i++) {
    const floor = floors[i];

    if (targetRow == 0) {
      break;
    }
    targetRow--;

    const rooms = floor.rooms;
    const length = rooms.length;
    for (let j = 0; j < length; j++) {
      const room = floor.rooms[j];

      if (targetRow == 0) {
        newY = room.number;
        break;
      }
      targetRow--;
    }
  }

  if ((newY > 0) && (newY != prevY)) {
    if (state.occupations[newY] === undefined) {
      state.occupations[newY] = [];
    }
    state.occupations[newY][x] = state.occupations[prevY][x];
    state.occupations[prevY][x] = undefined;

    state.tiles[state.occupations[newY][x] as number].roomNumber = newY;
  }
}

export const { scroll, changeDate, resize, fetchLeft, fetchRight, move } =
  mainSlice.actions;

export default mainSlice.reducer;
