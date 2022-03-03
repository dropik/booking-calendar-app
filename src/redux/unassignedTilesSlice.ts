import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import * as Utils from "../utils";
import * as TilesSlice from "./tilesSlice";

export type State = {
  [key: string]: string[]
};

const initialState: State = { };

const unassignedTilesSlice = createSlice({
  name: "unassignedTiles",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(TilesSlice.fetchAsync.fulfilled, (state, action) => {
      addFetchedTiles(state, action.payload);
    });
  }
});

function addFetchedTiles(state: WritableDraft<State>, tiles: TilesSlice.TileData[]): void {
  tiles.forEach((tile) => {
    if (tile.roomNumber === undefined) {
      const dateCounter = new Date(tile.from);
      for (let i = 0; i < tile.nights; i++) {
        const x = Utils.dateToString(dateCounter);
        if (state[x] === undefined) {
          state[x] = [];
        }
        state[x].push(tile.id);
        dateCounter.setDate(dateCounter.getDate() + 1);
      }
    }
  });
}

export default unassignedTilesSlice.reducer;
