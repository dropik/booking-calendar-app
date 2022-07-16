import React from "react";

import { TileData } from "../../../../../../../../redux/tilesSlice";
import { TileContext } from "./context";

import Title from "./Title";
import Body from "./Body";
import TileSize from "./TileSize";
import TileAlert from "./TileAlert";
import TileContainer from "./TileContainer";

type Props = {
  data: TileData
}

export default function Tile({ data }: Props): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false }}>
      <TileSize>
        <TileAlert>
          <TileContainer>
            <Title />
            <Body />
          </TileContainer>
        </TileAlert>
      </TileSize>
    </TileContext.Provider>
  );
}
