import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../redux/hooks";
import * as Utils from "../../../utils";

import UnassignedRow from "./unassigned-tiles-popup/UnassignedRow";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  const show = useShowPopup();
  const leftmostSelectedTileDate = useLeftmostSelectedTileDate();
  const tilesPerSelectedDay = useTilesPerSelectedDay();
  const left = useLeftShift(leftmostSelectedTileDate);
  const ref = useRef<HTMLDivElement>(null);

  const className = getClassName(show);
  const rows = getRows(tilesPerSelectedDay, leftmostSelectedTileDate);

  useScrollEffect(ref, left);

  return (<div ref={ref} className={className}>{rows}</div>);
}

function useShowPopup(): boolean | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      return (state.unassignedTiles.map[selectedDate].length > 0);
    }
  });
}

function useLeftmostSelectedTileDate(): string | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      let leftmostSelectedTileDate = selectedDate;
      for (const tileId of state.unassignedTiles.map[selectedDate]) {
        const tile = state.tiles.data[tileId];
        if (Utils.daysBetweenDates(leftmostSelectedTileDate, tile.from) < 0) {
          leftmostSelectedTileDate = tile.from;
        }
      }
      return leftmostSelectedTileDate;
    }
  });
}

function useTilesPerSelectedDay(): string[] | undefined {
  return useAppSelector((state) => state.unassignedTiles.map[state.unassignedTiles.selectedDate as string]);
}

function useLeftShift(leftmostSelectedTileDate: string | undefined): number {
  return useAppSelector((state) => {
    if (leftmostSelectedTileDate) {
      const daysShift = Utils.daysBetweenDates(state.table.leftmostDate, leftmostSelectedTileDate);
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

function getRows(tilesPerSelectedDay: string[] | undefined, leftmostSelectedTileDate: string | undefined): JSX.Element[] {
  const rows: JSX.Element[] = [];
  if (tilesPerSelectedDay) {
    for (const tileId of tilesPerSelectedDay) {
      if (leftmostSelectedTileDate) {
        rows.push(<UnassignedRow key={tileId} tileId={tileId} leftmostSelectedTileDate={leftmostSelectedTileDate} />);
      }
    }
  }
  return rows;
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

export default hot(module)(UnassignedTilesPopup);
