import React from "react";

import { TileDescriptor } from ".";

import FreeSpace from "./FreeSpace";
import Tile from "./Tile";

type Props = {
  tilesInRoom: TileDescriptor[]
}

export default function TileSwitch({ tilesInRoom }: Props): JSX.Element {
  return (
    <>
      {
        tilesInRoom.map((tile) => {
          if ("id" in tile) {
            return <Tile key={tile.id} data={tile} />;
          } else {
            return (
              <FreeSpace
                key={tile.from}
                from={tile.from}
                to={tile.to}
                cropLeft={tile.cropLeft}
                cropRight={tile.cropRight}
              />
            );
          }
        })
      }
    </>
  );
}
