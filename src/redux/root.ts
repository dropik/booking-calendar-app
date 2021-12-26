import { combineReducers } from "@reduxjs/toolkit";

import table from "./tableSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";
import columns from "./columnsSlice";
import tableDimentions from "./tableDimentionsSlice";

export const reducer = combineReducers(
  { table, grabbedTile, hotel, scroll, columns, tableDimentions }
);
