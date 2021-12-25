import { combineReducers } from "@reduxjs/toolkit";

import main from "./mainSlice";
import grabbedTile from "./grabbedTileSlice";
import hotel from "./hotelSlice";
import scroll from "./scrollSlice";

export const reducer = combineReducers({ main, grabbedTile, hotel, scroll });
