import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHoveredId, useIsGrabbing, useMousePosition, useTileData } from "../redux/hooks";
import * as MouseSlice from "../redux/mouseSlice";
import * as TilesSlice from "../redux/tilesSlice";

import "./OccupationInfo.css";

function OccupationInfo(): JSX.Element {
  const mousePosition = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const hoveredId = useHoveredId();
  const tileData = useTileData(hoveredId);
  const isGrabbing = useIsGrabbing();

  useUpdateMousePositionEffect(dispatch);
  useUpdatePopupCoordsEffect(ref, mousePosition);

  const className = getClassName(hoveredId, isGrabbing);

  return getContents(tileData, ref, className);
}

function useUpdatePopupCoordsEffect(
  ref: React.RefObject<HTMLDivElement>,
  mousePosition: MouseSlice.MousePosition
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${mousePosition.y + 10}px`;
      ref.current.style.left = `${mousePosition.x + 20}px`;
    }
  }, [ref, mousePosition]);
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

function getClassName(hoveredId: number | undefined, isGrabbing: boolean): string {
  let className = "occupation-info";
  if ((hoveredId === undefined) || isGrabbing) {
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
      <p className="occupation-info-header">{tileData.name}</p>
      <div className="occupation-info-data">
        <p>Camera: {tileData.roomType}</p>
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

export default hot(module)(OccupationInfo);
