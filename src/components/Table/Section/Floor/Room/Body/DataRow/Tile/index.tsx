import React from "react";

import { TileData } from "../../../../../../../../redux/tilesSlice";
import { TileContext } from "./context";

import Title from "./Title";
import Body from "./Body";
import Size from "./Size";
import Alert from "./Alert";
import Container from "./Container";
import Draggable from "./Draggable";

type Props = {
  data: TileData
}

export default function Tile({ data }: Props): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false }}>
      <Size>
        <Draggable>
          <Alert>
            <Container>
              <Title />
              <Body />
            </Container>
          </Alert>
        </Draggable>
      </Size>
    </TileContext.Provider>
  );
}
