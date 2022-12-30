import React from "react";

import { TileData } from "../../../../../../../redux/tilesSlice";
import { TileContext } from "../../../../../../Tile/context";

import Container from "../../../../../../Tile/Container";
import Size from "../../../../../../Tile/Size";
import DropAccepter from "./DropAccepter";

type DropZoneProps = {
  roomId: number,
  data: TileData
};

export default function DropZone({ roomId, data }: DropZoneProps): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false}}>
      <Size sx={{ pt: "calc(0.25rem - 1px)", pb: "calc(0.25rem - 1px)" }}>
        <DropAccepter roomId={roomId}>
          <Container dropZone={true} />
        </DropAccepter>
      </Size>
    </TileContext.Provider>
  );
}
