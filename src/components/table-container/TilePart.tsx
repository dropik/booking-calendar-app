import React, { Dispatch, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Utils from "../../utils";

import {
  useAppDispatch,
  useColumns,
  useIsGrabbedTile,
  useLeftmostDate,
  usePersonsInRoomType,
  useRoomTypeByNumber
} from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as HoveredIdSlice from "../../redux/hoveredIdSlice";

import "./TilePart.css";
import TilePartAlert from "./TilePartAlert";

type Props = {
  x: string,
  y: number,
  tileData: TilesSlice.TileData
};

function TilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileId = props.tileData.id;
  const grabbed = useIsGrabbedTile(tileId);
  const ref = useRef<HTMLDivElement>(null);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const roomType = useRoomTypeByNumber(props.y);
  const personsInRoomType = usePersonsInRoomType(roomType);

  const outOfBound = isOutOfBound(props.tileData, leftmostDate, columns);
  const grabHandler = getGrabHandler(ref, dispatch, tileId, outOfBound);
  const enterHandler = getEnterHandler(dispatch, tileId);
  const leaveHandler = getLeaveHandler(dispatch);
  const className = getClassName(grabbed, outOfBound);

  useBackgroundColourEffect(ref, props.tileData.colour);

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={grabHandler}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      <span className="tile-persons">{props.tileData.persons}</span>
      <TilePartAlert personsInRoomType={personsInRoomType} roomType={roomType} tileData={props.tileData} />
    </div>
  );
}

function getGrabHandler(
  ref: React.RefObject<HTMLDivElement>,
  dispatch: React.Dispatch<AnyAction>,
  tileId: string,
  outOfBound: boolean
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if ((event.button == 0) && !outOfBound && ref.current) {
      dispatch(TilesSlice.grab({ tileId, mouseY: event.pageY - ref.current.getBoundingClientRect().top }));
    }
  };
}

function getEnterHandler(dispatch: Dispatch<AnyAction>, tileId: string): () => void {
  return () => dispatch(HoveredIdSlice.set(tileId));
}

function getLeaveHandler(dispatch: Dispatch<AnyAction>): () => void {
  return () => dispatch(HoveredIdSlice.set(undefined));
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function getClassName(grabbed: boolean | undefined, outOfBound: boolean): string {
  let className = "tile";
  if (grabbed) {
    className += " grabbed";
  }
  if (outOfBound) {
    className += " out-of-bound";
  }
  return className;
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
