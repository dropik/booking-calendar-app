import React, { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector, useTileData } from "../redux/hooks";
import * as TilesSlice from "../redux/tilesSlice";
import * as Utils from "../utils";

import "./OccupationInfo.css";

type MousePosition = {
  x: number,
  y: number
};

function OccupationInfo(): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const hoveredId = useHoveredId();
  const tileData = useTileData(hoveredId);
  const canShow = useCanShow();

  const show = canShow && (tileData !== undefined);

  useUpdateMousePositionEffect(setMousePosition, show);
  useUpdatePopupCoordsEffect(ref, mousePosition);

  const className = getClassName(hoveredId, canShow);

  return getContents(tileData, ref, className);
}

function useHoveredId() {
  return useAppSelector(state => state.hoveredId.value);
}

function useCanShow(): boolean {
  return useAppSelector(state => (state.tiles.grabbedTile === undefined) && (state.contextMenu.tileId === undefined));
}

function useUpdatePopupCoordsEffect(
  ref: React.RefObject<HTMLDivElement>,
  mousePosition: MousePosition
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${mousePosition.y + 10}px`;
      ref.current.style.left = `${mousePosition.x + 20}px`;
    }
  }, [ref, mousePosition]);
}

function useUpdateMousePositionEffect(dispatch: React.Dispatch<SetStateAction<MousePosition>>, show: boolean): void {
  useEffect(() => {
    function updateMousePosition(event: MouseEvent) {
      dispatch({ x: event.x, y: event.y });
    }
    if (show) {
      window.addEventListener("mousemove", updateMousePosition);
    }
    return () => {
      if (show) {
        window.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [dispatch, show]);
}

function getClassName(hoveredId: string | undefined, canShow: boolean): string {
  let className = "occupation-info";
  if (!hoveredId || !canShow) {
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
      <p className="occupation-info-header room-type">{Utils.getFullRoomType(tileData.entity, tileData.roomType)}</p>
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

export default hot(module)(OccupationInfo);
