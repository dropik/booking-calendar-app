import { createSlice } from "@reduxjs/toolkit";

import { remToPx, daysBetweenDates } from "../utils";
import globals from "../globals";
import mocks from "../mocks";

export const mainSlice = createSlice({
  name: "main",
  initialState: initState(),
  reducers: {
    scroll: (state, action) => {
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor(
        (action.payload.scrollLeft + cellWidth / 2) / cellWidth
      );
      let newDate = new Date(state.startDate);
      newDate.setDate(newDate.getDate() + dateShift);
      state.currentDate = newDate.toLocaleDateString("en-CA");
      state.scrollLeft = action.payload.scrollLeft;
    },
    changeDate: (state, action) => {
      state.startDate = calculateStartDate(action.payload.date);
      recalculateColumns(state);
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    resize: state => {
      recalculateColumns(state);
    },
    fetchLeft: (state, action) => {
      state.startDate = calculateStartDate(state.startDate);
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    fetchRight: (state, action) => {
      state.columns += globals.TABLE_PRELOAD_AMOUNT;
      state.tiles = [...state.tiles, ...action.payload.tiles];
      state.occupations = recalculateOccupations(state.tiles, state.startDate);
    },
    move: (state, action) => {
      moveOccupation(state, action);
    }
  },
});

function initState() {
  let currentDate = new Date();
  let startDate = calculateStartDate(currentDate);
  let tiles = mocks.tiles;

  return {
    currentDate: currentDate.toLocaleDateString("en-CA"),
    startDate: startDate,
    columns: getInitialColumnsAmount(document.documentElement.clientWidth),
    scrollLeft: 0,
    tiles: tiles,
    hotel: mocks.hotel,
    occupations: recalculateOccupations(tiles, startDate)
  };
}

function calculateStartDate(date) {
  let result = new Date(date);
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result.toLocaleDateString("en-CA");
}

function recalculateColumns(state) {
  state.columns = getInitialColumnsAmount(document.documentElement.clientWidth);
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

function recalculateOccupations(tiles, startDate) {
  var occupations = [];
  tiles.forEach((tile, index) => {
    var roomNumber = tile.roomNumber;
    var row = occupations[roomNumber];
    if (row === undefined) {
      row = [];
    }
    var fromDate = new Date(tile.from);
    var x = daysBetweenDates(startDate, fromDate);
    row[x] = index;
    occupations[roomNumber] = row;
  });
  return occupations;
}

function moveOccupation(state, action) {
  var margin = remToPx(8) + 1;
  var tableY = action.payload.pageY - margin;
  var rowHeight = remToPx(4) + 1;
  var targetRow = Math.floor(tableY / rowHeight);
  var prevY = action.payload.y;
  var x = action.payload.x;
  var newY = -1;

  const floors = state.hotel.floors;
  const length = floors.length;
  for (var i = 0; i < length; i++) {
    const floor = floors[i];

    if (targetRow == 0) {
      break;
    }
    targetRow--;

    const rooms = floor.rooms;
    const length = rooms.length;
    for (var j = 0; j < length; j++) {
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

    state.tiles[state.occupations[newY][x]].roomNumber = newY;
  }
}

export const { scroll, changeDate, resize, fetchLeft, fetchRight, move } =
  mainSlice.actions;

export default mainSlice.reducer;
