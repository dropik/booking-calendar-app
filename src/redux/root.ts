import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import tiles from "./tilesSlice";

export default combineReducers({ table, grabbedTile, hotel, scroll, tiles });
