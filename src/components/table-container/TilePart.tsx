import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Utils from "../../utils";

import { useAppDispatch, useColumns, useGrabbedTile, useLeftmostDate, useTileIdByCoords } from "../../redux/hooks";
import * as GrabbedTileSlice from "../../redux/grabbedTileSlice";
import * as TilesSlice from "../../redux/tilesSlice";

import "./TilePart.css";

type Props = {
  x: string,
  y: number,
  tileData: TilesSlice.TileData
};

function TilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const grabbedTile = useGrabbedTile();
  const tileId = useTileIdByCoords(props.x, props.y);
  const grabbed = tileId === grabbedTile.tileId;
  const top = grabbed ? grabbedTile.top : 0;
  const ref = useRef<HTMLDivElement>(null);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const outOfBound = isOutOfBound(props.tileData, leftmostDate, columns);
  const grabHandler = getGrabHandler(dispatch, tileId, outOfBound);

  useMouseHandlingEffects(dispatch, grabbed);
  useInlineStyleEffects(ref, props.tileData.colour, top);

  let className = "tile";
  if (grabbed) {
    className += " grabbed";
  }
  if (outOfBound) {
    className += " out-of-bound";
  }

  return (
    <div ref={ref} className={className} onMouseDown={grabHandler}>
      <span className="tile-persons">{props.tileData.persons}</span>
    </div>
  );
}

function getGrabHandler(
  dispatch: React.Dispatch<AnyAction>,
  tileId: number,
  outOfBound: boolean
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!outOfBound) {
      dispatch(GrabbedTileSlice.grab({ tileId, pageY: event.pageY }));
    }
  };
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function useMouseHandlingEffects(
  dispatch: React.Dispatch<AnyAction>,
  grabbed: boolean
): void {
  useEffect(() => {
    function onMove(event: MouseEvent) {
      dispatch(GrabbedTileSlice.drag({ pageY: event.pageY }));
    }

    function onDrop() {
      dispatch(GrabbedTileSlice.drop());
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    }

    if (grabbed) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [grabbed, dispatch]);
}

function useInlineStyleEffects(
  ref: React.RefObject<HTMLDivElement>,
  colour: string,
  top: number
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = colour;
    }
  }, [ref, colour]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${top}px`;
    }
  }, [ref, top]);
}

export default hot(module)(TilePart);
