import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector, useTileData } from "../redux/hooks";
import * as Utils from "../utils";

import "./OccupationInfo.css";

function OccupationInfo(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const x = useAppSelector((state) => state.occupationInfo.x);
  const y = useAppSelector((state) => state.occupationInfo.y);
  const hoveredId = useAppSelector(state => state.occupationInfo.hoveredId);
  const tileData = useTileData(hoveredId);
  const canShow = useCanShow();

  useUpdatePopupCoordsEffect(ref, x, y);

  return tileData && canShow ?
    (
      <div ref={ref} className="occupation-info">
        <p className="occupation-info-header name">{tileData.name}</p>
        <p className="occupation-info-header room-type">{Utils.getFullRoomType(tileData.entity, tileData.roomType)}</p>
        <div className="occupation-info-data">
          <p>Ospiti: {tileData.persons}</p>
          <p>Arrivo: {(new Date(tileData.from)).toLocaleDateString()}</p>
          <p>Partenza: {getLocaleDepartureDate(tileData.from, tileData.nights)}</p>
        </div>
      </div>
    ) :
    <></>;
}

function useCanShow(): boolean {
  return useAppSelector(state => (state.tiles.grabbedTile === undefined) && (state.contextMenu.tileId === undefined));
}

function useUpdatePopupCoordsEffect(
  ref: React.RefObject<HTMLDivElement>,
  x: number,
  y: number
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${y + 10}px`;
      ref.current.style.left = `${x + 20}px`;
    }
  }, [ref, x, y]);
}

function getLocaleDepartureDate(from: string, nights: number): string {
  const date = new Date(from);
  date.setDate(date.getDate() + nights);
  return date.toLocaleDateString();
}

export default hot(module)(OccupationInfo);
