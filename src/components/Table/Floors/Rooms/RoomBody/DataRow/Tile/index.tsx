import React, { createContext } from "react";
import Box from "@mui/material/Box";

import { TileData } from "../../../../../../../redux/tilesSlice";
import Title from "./Title";
import Body from "./Body";
import TileSize from "./TileSize";
import TileAlert from "./TileAlert";
import TileContainer from "./TileContainer";

type Props = {
  data: TileData
}

type TileContextType = {
  data: TileData,
  cropLeft: boolean,
  cropRight: boolean
}

export const TileContext = createContext<TileContextType>({
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

export default function Tile({ data }: Props): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false }}>
      <TileSize>
        <TileAlert>
          <TileContainer>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              overflow: "hidden",
              "& > span": {
                width: "100%",
                whiteSpace: "nowrap"
              }
            }}>
              <Title />
              <Body />
            </Box>
          </TileContainer>
        </TileAlert>
      </TileSize>
    </TileContext.Provider>
  );
}
