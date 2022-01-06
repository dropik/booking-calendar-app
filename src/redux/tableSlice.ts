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
    [key: string]: (TileData | undefined)
  }
};

export type State = {
  status: "idle" | "loading" | "failed",
  initialDate: string,
  leftmostDate: string,
  columns: number,
  offsetHeight: number,
  clientHeight: number,
  occupations: Occupations
};

const initialState: State = {
  status: "idle",
  initialDate: Utils.dateToString(new Date()),
  leftmostDate: calculateLeftmostDate(new Date()),
  columns: getInitialColumnsAmount(),
  offsetHeight: 0,
  clientHeight: 0,
  occupations: {}
};

export const fetchTilesAsync = createAsyncThunk(
  "table/fetchTiles",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as Store.RootState;
    const from = state.table.leftmostDate;
    const to = calculateRightmostDate(from, state.table.columns);
    const response = await Api.fetchTilesAsync(from, to);
    return response.data;
  }
);

export type FetchTilesAsyncAction = ReturnType<typeof fetchTilesAsync>;

export const tableSlice = createSlice({
  name: "table",
  initialState: initialState,
  reducers: {
    resize: (state) => {
      state.columns = getInitialColumnsAmount();
    },
    updateHeights: (state, action: PayloadAction<{ offsetHeight: number, clientHeight: number }>) => {
      state.offsetHeight = action.payload.offsetHeight;
      state.clientHeight = action.payload.clientHeight;
    },
    changeDate: (state, action: PayloadAction<{ date: string }>) => {
      state.initialDate = action.payload.date;
      state.leftmostDate = calculateLeftmostDate(action.payload.date);
      state.columns = getInitialColumnsAmount();
    },
    fetchLeft: (state) => {
      state.leftmostDate = calculateLeftmostDate(state.leftmostDate);
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
    },
    fetchRight: (state) => {
      state.columns += Globals.TABLE_PRELOAD_AMOUNT;
    },
    move: (state, action: PayloadAction<{ x: string, y: number, newY: number }>) => {
      moveOccupation(state, action);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTilesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTilesAsync.fulfilled, (state, action: PayloadAction<TileData[]>) => {
        state.status = "idle";
        addFetchedOccupations(state, action.payload);
      })
      .addCase(fetchTilesAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});

function getInitialColumnsAmount() {
  const roomCellWidth = Utils.remToPx(6);
  const containerWidth = Utils.remToPx(4);
  let columns = Math.ceil((document.documentElement.clientWidth - roomCellWidth) / containerWidth);
  columns += Globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

function calculateLeftmostDate(date: string | Date): string {
  const result = new Date(date);
  result.setDate(result.getDate() - Globals.TABLE_PRELOAD_AMOUNT);
  return Utils.dateToString(result);
}

function calculateRightmostDate(leftmostDate: string | Date, columns: number): string {
  const result = new Date(leftmostDate);
  result.setDate(result.getDate() + columns);
  return Utils.dateToString(result);
}

function addFetchedOccupations(state: State, tiles: Array<TileData>): void {
  tiles.forEach(tile => {
    const roomNumber = tile.roomNumber;
    let row = state.occupations[roomNumber];
    if (row === undefined) {
      row = {};
    }
    row[tile.from] = tile;
    state.occupations[roomNumber] = row;
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
    if (state.occupations[newY] === undefined) {
      state.occupations[newY] = {};
    }
    state.occupations[newY][x] = state.occupations[prevY][x];
    state.occupations[prevY][x] = undefined;
  }
}

export const { resize, updateHeights, changeDate, fetchLeft, fetchRight, move } = tableSlice.actions;

export default tableSlice.reducer;
