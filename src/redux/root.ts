import { combineReducers } from "@reduxjs/toolkit";

import { api } from "../api";
import table from "./tableSlice";
import floors from "./floorsSlice";
import rooms from "./roomsSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import roomTypes from "./roomTypesSlice";
import drawer from "./drawerSlice";
import dialog from "./dialogSlice";
import snackbarMessage from "./snackbarMessageSlice";
import layout from "./layoutSlice";
import bookingsForm from "./bookingsFormSlice";
import roomRates from "./roomRatesSlice";
import auth from "./authSlice";
import user from "./userSlice";

export default combineReducers(
  {
    [api.reducerPath]: api.reducer,
    table,
    floors,
    rooms,
    scroll,
    tiles,
    roomTypes,
    drawer,
    dialog,
    snackbarMessage,
    layout,
    bookingsForm,
    roomRates,
    auth,
    user,
  }
);
