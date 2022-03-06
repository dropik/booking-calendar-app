import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../redux/hooks";
import * as Utils from "../../../utils";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  const show = useShowPopup();
  const left = useLeftShift();
  const ref = useRef<HTMLDivElement>(null);

  const className = getClassName(show);

  useScrollEffect(ref, left);

  return (
    <div ref={ref} className={className}>
      <div className="unassigned-row">
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
      </div>
    </div>
  );
}

function useShowPopup(): boolean | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      return (state.unassignedTiles.map[selectedDate].length > 0);
    }
  });
}

function useLeftShift(): number {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      let leftmostTileFromDate = selectedDate;
      for (const tileId of state.unassignedTiles.map[selectedDate]) {
        const tile = state.tiles.data[tileId];
        if (Utils.daysBetweenDates(leftmostTileFromDate, tile.from) < 0) {
          leftmostTileFromDate = tile.from;
        }
      }
      const daysShift = Utils.daysBetweenDates(state.table.leftmostDate, leftmostTileFromDate);
      const cellWidth = Utils.remToPx(4) + 2;
      const hotelBarShift = Utils.remToPx(6.5) + 4;
      return hotelBarShift + daysShift * cellWidth - state.scroll.left;
    } else return 0;
  });
}

function getClassName(show: boolean | undefined): string {
  let className = "unassigned-tiles-popup";
  if (!show) {
    className += " hidden";
  }
  return className;
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

export default hot(module)(UnassignedTilesPopup);
