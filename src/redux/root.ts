import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import unassignedTiles from "./unassignedTilesSlice";
import hoveredId from "./hoveredIdSlice";
import roomTypes from "./roomTypesSlice";

export default combineReducers({ table, hotel, scroll, tiles, unassignedTiles, hoveredId, roomTypes });
