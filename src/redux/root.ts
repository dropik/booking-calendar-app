import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";

export default combineReducers({ table, grabbedTile, hotel, scroll });
