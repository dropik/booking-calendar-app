import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";
import * as TilesSlice from "./tilesSlice";

export type State = {
  map: {
    [key: string]: {
      [key: string]: string
    }
  },
  selectedDate?: string
  grabbedTile?: string
  grabbedMouseY: number
};

const initialState: State = {
  map: { },
  grabbedMouseY: 0
};

const unassignedTilesSlice = createSlice({
  name: "unassignedTiles",
  initialState: initialState,
  reducers: {
    toggleDate: (state, action: PayloadAction<{ date: string | undefined }>) => {
      state.selectedDate = state.selectedDate === action.payload.date ? undefined : action.payload.date;
    },
    grab: (state, action: PayloadAction<{ tileId: string, mouseY: number }>) => {
      state.grabbedTile = action.payload.tileId;
      state.grabbedMouseY = action.payload.mouseY;
    },
    drop: (state) => {
      state.grabbedTile = undefined;
      state.grabbedMouseY = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(TilesSlice.fetchAsync.fulfilled, (state, action) => {
      addFetchedTiles(state, action.payload);
    });
  }
});

export const { toggleDate, grab, drop } = unassignedTilesSlice.actions;

function addFetchedTiles(state: WritableDraft<State>, tiles: TilesSlice.TileData[]): void {
  tiles.forEach((tile) => {
    if (tile.roomNumber === undefined) {
      const dateCounter = new Date(tile.from);
      for (let i = 0; i < tile.nights; i++) {
        const x = Utils.dateToString(dateCounter);
        if (state.map[x] === undefined) {
          state.map[x] = { };
        }
        state.map[x][tile.id] = tile.id;
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    }
  });
}

export default unassignedTilesSlice.reducer;
