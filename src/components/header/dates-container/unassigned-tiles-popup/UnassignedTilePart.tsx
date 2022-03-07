import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import * as Utils from "../../../../utils";
import * as TilesSlice from "../../../../redux/tilesSlice";
import * as HoveredIdSlice from "../../../../redux/hoveredIdSlice";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

function UnassignedTilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileData = useTileData(props.tileId);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const ref = useRef<HTMLDivElement>(null);

  useBackgroundColorEffect(ref, tileData);

  if (!props.hasTilePart) {
    return <></>;
  }

  const enterHandler = getEnterHandler(dispatch, props.tileId);
  const leaveHandler = getLeaveHandler(dispatch);
  const outOfBound = isOutOfBound(tileData, leftmostDate, columns);
  const className = getClassName(outOfBound);

  return (
    <div
      ref={ref}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      className={className}
    >
      <b>{tileData.persons}</b>
    </div>
  );
}

function useTileData(tileId: string): TilesSlice.TileData {
  return useAppSelector((state) => state.tiles.data[tileId]);
}

function useBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, tileData: TilesSlice.TileData): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = tileData.colour;
    }
  }, [ref, tileData]);
}

function getEnterHandler(dispatch: React.Dispatch<AnyAction>, tileId: string): () => void {
  return () => dispatch(HoveredIdSlice.set(tileId));
}

function getLeaveHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => dispatch(HoveredIdSlice.set(undefined));
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function getClassName(outOfBound: boolean): string {
  let className = "unassigned-tile-part";
  if (outOfBound) {
    className += " out-of-bound";
  }
  return className;
}

export default hot(module)(UnassignedTilePart);
