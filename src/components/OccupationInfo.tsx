import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHoveredId, useIsGrabbing, useMouseX, useMouseY, useTileData } from "../redux/hooks";
import * as MouseSlice from "../redux/mouseSlice";
import * as TilesSlice from "../redux/tilesSlice";
import * as Utils from "../utils";

import "./OccupationInfo.css";

function OccupationInfo(): JSX.Element {
  const mouseX = useMouseX();
  const mouseY = useMouseY();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const hoveredId = useHoveredId();
  const tileData = useTileData(hoveredId);
  const isGrabbing = useIsGrabbing();

  useUpdateMousePositionEffect(dispatch);
  useUpdatePopupCoordsEffect(ref, mouseX, mouseY);

  const className = getClassName(hoveredId, isGrabbing);

  return getContents(tileData, ref, className);
}

function useUpdatePopupCoordsEffect(
  ref: React.RefObject<HTMLDivElement>,
  mouseX: number,
  mouseY: number
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${mouseY + 10}px`;
      ref.current.style.left = `${mouseX + 20}px`;
    }
  }, [ref, mouseX, mouseY]);
}

function useUpdateMousePositionEffect(dispatch: Dispatch<AnyAction>): void {
  useEffect(() => {
    function updateMousePosition(event: MouseEvent) {
      dispatch(MouseSlice.updatePosition({ x: event.x, y: event.y }));
    }
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [dispatch]);
}

function getClassName(hoveredId: string | undefined, isGrabbing: boolean): string {
  let className = "occupation-info";
  if (!hoveredId || isGrabbing) {
    className += " hidden";
  }
  return className;
}

function getContents(
  tileData: TilesSlice.TileData | undefined,
  ref: React.RefObject<HTMLDivElement>,
  className: string
): JSX.Element {
  return (tileData === undefined) ? (
    <div ref={ref} className={className}></div>
  ) : (
    <div ref={ref} className={className}>
      <p className="occupation-info-header name">{tileData.name}</p>
      <p className="occupation-info-header room-type">{getFullRoomType(tileData.entity, tileData.roomType)}</p>
      <div className="occupation-info-data">
        <p>Ospiti: {tileData.persons}</p>
        <p>Arrivo: {(new Date(tileData.from)).toLocaleDateString()}</p>
        <p>Partenza: {getLocaleDepartureDate(tileData.from, tileData.nights)}</p>
      </div>
    </div>
  );
}

function getLocaleDepartureDate(from: string, nights: number): string {
  const date = new Date(from);
  date.setDate(date.getDate() + nights);
  return date.toLocaleDateString();
}

function getFullRoomType(entity: string, roomType: string): string {
  return `${Utils.getFirstLetterUppercase(entity)} (${Utils.getFirstLetterUppercase(roomType)})`;
}

export default hot(module)(OccupationInfo);
