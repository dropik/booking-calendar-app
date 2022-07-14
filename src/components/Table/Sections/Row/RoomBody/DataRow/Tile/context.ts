import { createContext } from "react";

import { TileData } from "../../../../../../../redux/tilesSlice";

export const TileContext = createContext<{
  data: TileData,
  cropLeft: boolean,
  cropRight: boolean
}>({
  data: {
    id: "",
    bookingId: "",
    name: "",
    from: "",
    nights: 0,
    roomType: "",
    entity: "",
    persons: 0,
    color: "booking1"
  },
  cropLeft: false,
  cropRight: false
});
