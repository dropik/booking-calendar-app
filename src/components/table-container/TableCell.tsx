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

function TableCell(props: Props): JSX.Element {
  const tileData = useTileDataAt(props.x, props.y);

  const tile: JSX.Element[] = [];
  if (tileData !== undefined) {
    tile.push(
      <TilePart
        key="tile"
        x={props.x}
        y={props.y}
        tileData={tileData}
      />
    );
  }

  return <div className="table-cell">{tile}</div>;
}

function useTileDataAt(x: string, y: number): TilesSlice.TileData | undefined {
  return useAppSelector(state => {
    const tilesForRoom = state.tiles.assignedMap[y];
    return (tilesForRoom === undefined) ? undefined : state.tiles.data[tilesForRoom[x] as string];
  });
}

export default memo(hot(module)(TableCell));
