import React, { Dispatch, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
import * as AssignedTilesSlice from "../../redux/assignedTilesSlice";
import * as HoveredIdSlice from "../../redux/hoveredIdSlice";

import "./TilePart.css";

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
  const grabHandler = getGrabHandler(dispatch, tileId, props.x, props.y, outOfBound);
  const enterHandler = getEnterHandler(dispatch, tileId);
  const leaveHandler = getLeaveHandler(dispatch);
  const className = getClassName(grabbed, outOfBound);
  const alert = getAlert(personsInRoomType, roomType, props.tileData);

  useMouseHandlingEffects(dispatch, ref, tileId, grabbed);
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
      {alert}
    </div>
  );
}

function getGrabHandler(
  dispatch: React.Dispatch<AnyAction>,
  tileId: string,
  x: string,
  y: number,
  outOfBound: boolean
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if ((event.button == 0) && !outOfBound) {
      dispatch(AssignedTilesSlice.grab({ tileId, x, y }));
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

function getAlert(personsInRoomType: number[], roomType: string, tileData: TilesSlice.TileData): JSX.Element {
  let alert: JSX.Element = <></>;
  if (personsInRoomType.includes(tileData.persons)) {
    if (roomType !== tileData.roomType) {
      alert = (
        <span
          className="tile-alert warning"
          title="Tipologia della stanza diversa da quella prenotata"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </span>
      );
    }
  } else {
    alert = (
      <span
        className="tile-alert error"
        title="Usata una stanza con il numero di occupazioni non corretti per questa prenotazione"
      >
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </span>
    );
  }
  return alert;
}

function useMouseHandlingEffects(
  dispatch: React.Dispatch<AnyAction>,
  ref: React.RefObject<HTMLDivElement>,
  tileId: string,
  grabbed: boolean | undefined
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
      dispatch(AssignedTilesSlice.drop({ tileId }));
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
  }, [dispatch, ref, tileId, grabbed]);
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
