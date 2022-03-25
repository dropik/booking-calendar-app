import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import hoveredId from "./hoveredIdSlice";
import roomTypes from "./roomTypesSlice";
import contextMenu from "./contextMenuSlice";
import saveChanges from "./saveChangesSlice";
import sidemenu from "./sidemenuSlice";
import dialog from "./dialogSlice";

export default combineReducers(
  {
    table,
    hotel,
    scroll,
    tiles,
    hoveredId,
    roomTypes,
    contextMenu,
    saveChanges,
    sidemenu,
    dialog
  }
);
