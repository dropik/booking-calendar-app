import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import roomTypes from "./roomTypesSlice";
import drawer from "./drawerSlice";
import dialog from "./dialogSlice";
import snackbarMessage from "./snackbarMessageSlice";
import layout from "./layoutSlice";
import bookingsForm from "./bookingsFormSlice";

export default combineReducers(
  {
    table,
    hotel,
    scroll,
    tiles,
    roomTypes,
    drawer,
    dialog,
    snackbarMessage,
    layout,
    bookingsForm
  }
);
