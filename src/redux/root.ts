import { combineReducers } from "@reduxjs/toolkit";

import main from "./mainSlice";
import grabbedTile from "./grabbedTileSlice";

export const reducer = combineReducers({ main, grabbedTile });
