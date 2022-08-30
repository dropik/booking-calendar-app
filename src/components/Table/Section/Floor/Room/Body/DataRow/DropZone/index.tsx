import React from "react";

import { TileData } from "../../../../../../../../redux/tilesSlice";
import { TileContext } from "../Tile/context";

import Container from "../Tile/Container";
import Size from "../Tile/Size";
import DropAccepter from "./DropAccepter";

type DropZoneProps = {
  roomNumber: number,
  data: TileData
};

export default function DropZone({ roomNumber, data }: DropZoneProps): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false}}>
      <Size>
        <DropAccepter roomNumber={roomNumber}>
          <Container dropZone={true} />
        </DropAccepter>
      </Size>
    </TileContext.Provider>
  );
}
