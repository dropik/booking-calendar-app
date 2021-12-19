import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

import Tile from "./Tile";

import "./TableCell.css";

type Props = {
  x: number;
  y: number;
};

function TableCell(props: Props) {
  const tileData = useAppSelector(state => {
    const occupations = state.main.occupations;
    const occupationsForRoom = occupations[props.y];
    return occupationsForRoom === undefined ?
      undefined : (
        occupationsForRoom[props.x] === undefined ?
          undefined :
          state.main.tiles[occupationsForRoom[props.x] as number]
      );
  });

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

export default hot(module)(TableCell);
