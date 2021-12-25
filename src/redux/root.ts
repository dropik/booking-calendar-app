import { combineReducers } from "@reduxjs/toolkit";

import main from "./mainSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";

export const reducer = combineReducers({ main, grabbedTile, hotel });
