import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../redux/hooks";
import * as TableSlice from "../../redux/tableSlice";

import Tile from "./Tile";

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
      <Tile
        key="tile"
        x={props.x}
        y={props.y}
        tileData={tileData}
      />
    );
  }

  return <div className="table-cell">{tile}</div>;
}

function useTileDataAt(x: string, y: number): TableSlice.TileData | undefined {
  return useAppSelector(state => {
    const occupations = state.table.occupations;
    const occupationsForRoom = occupations[y];
    return occupationsForRoom === undefined ?
      undefined : (
        occupationsForRoom[x] === undefined ?
          undefined :
          state.table.tiles[occupationsForRoom[x] as number]
      );
  });
}

export default hot(module)(TableCell);
