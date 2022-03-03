import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";
import assignedTiles from "./assignedTilesSlice";
import unassignedTiles from "./unassignedTilesSlice";
import hoveredId from "./hoveredIdSlice";
import roomTypes from "./roomTypesSlice";

export default combineReducers({ table, hotel, scroll, tiles, assignedTiles, unassignedTiles, hoveredId, roomTypes });
