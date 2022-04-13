import React, { memo } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../../redux/hooks";

import UnassignedTilePart from "./UnassignedTilePart";

import "./UnassignedCell.css";

type Props = {
  tileId: string,
  x: string
};

function UnassignedCell({ tileId, x }: Props): JSX.Element {
  const hasTilePart = useHasTilePart(x, tileId);

  return (
    <div className="unassigned-cell">
      <UnassignedTilePart tileId={tileId} hasTilePart={hasTilePart} />
    </div>
  );
}

function useHasTilePart(x: string, tileId: string): boolean {
  return useAppSelector((state) => {
    return (state.tiles.unassignedMap[x] !== undefined) && (state.tiles.unassignedMap[x][tileId] !== undefined);
  });
}

export default memo(hot(module)(UnassignedCell));
