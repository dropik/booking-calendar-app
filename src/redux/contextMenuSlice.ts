import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  tileId?: string,
  mouseX: number,
  mouseY: number
};

const initialState: State = {
  mouseX: 0,
  mouseY: 0
};

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: initialState,
  reducers: {
    showTileContextMenu: (state, action: PayloadAction<{ tileId: string, mouseX: number, mouseY: number }>) => {
      state.tileId = action.payload.tileId;
      state.mouseX = action.payload.mouseX;
      state.mouseY = action.payload.mouseY;
    },
    hideTileContextMenu: (state) => {
      state.tileId = undefined;
    }
  }
});

export const { showTileContextMenu, hideTileContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
