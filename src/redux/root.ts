import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import roomTypes from "./roomTypesSlice";
import contextMenu from "./contextMenuSlice";
import sidemenu from "./sidemenuSlice";
import dialog from "./dialogSlice";
import connectionError from "./connectionErrorSlice";

export default combineReducers(
  {
    table,
    hotel,
    scroll,
    tiles,
    roomTypes,
    contextMenu,
    sidemenu,
    dialog,
    connectionError
  }
);
