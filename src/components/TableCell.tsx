import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

import Tile from "./Tile";

import "./TableCell.css";

type Props = {
  x: number,
  y: number
};

function TableCell(props: Props) {
  const tileData = useTileDataAt(props.x, props.y);

  const tile =
    tileData !== undefined ? (
      <Tile
        x={props.x}
        y={props.y}
        tileData={tileData}
      />
    ) : (
      ""
    );

  return <div className="table-cell">{tile}</div>;
}

function useTileDataAt(x: number, y: number) {
  return useAppSelector(state => {
    const occupations = state.main.occupations;
    const occupationsForRoom = occupations[y];
    return occupationsForRoom === undefined ?
      undefined : (
        occupationsForRoom[x] === undefined ?
          undefined :
          state.main.tiles[occupationsForRoom[x] as number]
      );
  });
}

export default hot(module)(TableCell);
