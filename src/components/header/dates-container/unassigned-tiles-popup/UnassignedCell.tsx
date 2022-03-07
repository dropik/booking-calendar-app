import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../../redux/hooks";

import UnassignedTilePart from "./UnassignedTilePart";

import "./UnassignedCell.css";

type Props = {
  tileId: string,
  x: string
};

function UnassignedCell(props: Props): JSX.Element {
  const hasTilePart = useHasTilePart(props.x, props.tileId);

  return (
    <div className="unassigned-cell">
      <UnassignedTilePart tileId={props.tileId} hasTilePart={hasTilePart} />
    </div>
  );
}

function useHasTilePart(x: string, tileId: string): boolean {
  return useAppSelector((state) => {
    return (state.unassignedTiles.map[x] !== undefined) && (state.unassignedTiles.map[x][tileId] !== undefined);
  });
}

export default hot(module)(UnassignedCell);
