import { createContext } from "react";

import { TileData } from "../../redux/tilesSlice";

export const TileContext = createContext<{
  data?: TileData,
  cropLeft: boolean,
  cropRight: boolean
}>({
  cropLeft: false,
  cropRight: false
});
