import React, { memo } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TilePart from "./TilePart";

import "./TableCell.css";

type Props = {
  x: string,
  y: number
};

function TableCell({ x, y }: Props): JSX.Element {
  const tileData = useTileDataAt(x, y);

  return (
    <div className="table-cell">
      {
        tileData ?
          <TilePart
            key="tile"
            y={y}
            tileData={tileData}
          /> :
          <></>
      }
    </div>
  );
}

function useTileDataAt(x: string, y: number): TilesSlice.TileData | undefined {
  return useAppSelector(state => {
    const tilesForRoom = state.tiles.assignedMap[y];
    return (tilesForRoom === undefined) ? undefined : state.tiles.data[tilesForRoom[x] as string];
  });
}

export default memo(hot(module)(TableCell));
