import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import columns from "./columnsSlice";

export const reducer = combineReducers({ table, grabbedTile, hotel, scroll, columns });
