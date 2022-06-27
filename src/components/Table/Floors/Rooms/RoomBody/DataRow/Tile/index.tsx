import React from "react";
import Box from "@mui/material/Box";

import { TileData } from "../../../../../../../redux/tilesSlice";
import Title from "./Title";
import Body from "./Body";
import TileSize from "./TileSize";
import TileAlert from "./TileAlert";
import TileContainer from "./TileContainer";
import { TileContext } from "./context";

type Props = {
  data: TileData
}

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
