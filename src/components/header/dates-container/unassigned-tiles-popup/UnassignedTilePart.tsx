import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import * as Utils from "../../../../utils";
import * as TilesSlice from "../../../../redux/tilesSlice";
import * as HoveredIdSlice from "../../../../redux/hoveredIdSlice";
import * as ContextMenuSlice from "../../../../redux/contextMenuSlice";

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

  function onContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(ContextMenuSlice.show({ tileId: props.tileId, mouseX: event.pageX, mouseY: event.pageY }));
  }

  const outOfBound = isOutOfBound(tileData, leftmostDate, columns);
  const grabHandler = getGrabHandler(ref, dispatch, props.tileId, outOfBound);
  const enterHandler = getEnterHandler(dispatch, props.tileId);
  const leaveHandler = getLeaveHandler(dispatch);
  const className = getClassName(outOfBound);

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={grabHandler}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onContextMenu={onContextMenu}
    >
      {tileData.persons}
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

function getGrabHandler(
  ref: React.RefObject<HTMLDivElement>,
  dispatch: React.Dispatch<AnyAction>,
  tileId: string,
  outOfBound: boolean
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(HoveredIdSlice.set(undefined));
    if (!outOfBound && ref.current && (event.button === 0)) {
      dispatch(TilesSlice.grab({ tileId: tileId, mouseY: event.pageY - ref.current.getBoundingClientRect().top }));
    } else if (event.button === 2) {
      event.stopPropagation();
    }
  };
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
