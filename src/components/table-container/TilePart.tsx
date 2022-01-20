import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Utils from "../../utils";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate, useTileIdByCoords } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import "./TilePart.css";

type Props = {
  x: string,
  y: number,
  tileData: TilesSlice.TileData
};

function TilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileId = useTileIdByCoords(props.x, props.y);
  const grabbed = useAppSelector(state => state.tiles.data[tileId].grabbed);
  const ref = useRef<HTMLDivElement>(null);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const outOfBound = isOutOfBound(props.tileData, leftmostDate, columns);
  const grabHandler = getGrabHandler(dispatch, tileId, outOfBound);

  useMouseHandlingEffects(dispatch, ref, grabbed, tileId);
  useBackgroundColourEffect(ref, props.tileData.colour);

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
      dispatch(TilesSlice.grab({ tileId }));
    }
  };
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function useMouseHandlingEffects(
  dispatch: React.Dispatch<AnyAction>,
  ref: React.RefObject<HTMLDivElement>,
  grabbed: boolean | undefined,
  tileId: number
): void {
  useLayoutEffect(() => {
    const currentRef = ref.current;

    function onMove(event: MouseEvent) {
      if (currentRef) {
        const currentTopStr = currentRef.style.top;
        const currentTop = parseFloat(currentTopStr.substring(0, currentTopStr.length - 2));
        currentRef.style.top = `${currentTop + event.movementY / window.devicePixelRatio}px`;
      }
    }

    function onDrop() {
      dispatch(TilesSlice.drop({ tileId }));
    }

    if (grabbed) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    }

    return () => {
      if (currentRef) {
        currentRef.style.top = "0px";
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [dispatch, ref, grabbed, tileId]);
}

function useBackgroundColourEffect(
  ref: React.RefObject<HTMLDivElement>,
  colour: string
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = colour;
    }
  }, [ref, colour]);
}

export default hot(module)(TilePart);
