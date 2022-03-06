import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../redux/hooks";
import * as Utils from "../../../utils";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  const show = useShowPopup();
  const leftmostSelectedTileDate = useLeftmostSelectedTileDate();
  const rightmostSelectedTileDate = useRightmostSelectedTileDate();
  const tilesPerDay = useTilesPerDay();
  const left = useLeftShift(leftmostSelectedTileDate);
  const ref = useRef<HTMLDivElement>(null);

  const className = getClassName(show);
  const days = getDaysCount(leftmostSelectedTileDate, rightmostSelectedTileDate);
  const rows = getRows(tilesPerDay, leftmostSelectedTileDate, days);

  useScrollEffect(ref, left);

  return (
    <div ref={ref} className={className}>
      {rows}
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

function useRightmostSelectedTileDate(): string | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      let rightmostSelectedTileDate = selectedDate;
      for (const tileId of state.unassignedTiles.map[selectedDate]) {
        const tile = state.tiles.data[tileId];
        const departureDateObj = new Date(tile.from);
        departureDateObj.setDate(departureDateObj.getDate() + tile.nights);
        const departureDate = Utils.dateToString(departureDateObj);
        if (Utils.daysBetweenDates(rightmostSelectedTileDate, departureDate) > 0) {
          rightmostSelectedTileDate = departureDate;
        }
        return rightmostSelectedTileDate;
      }
    }
  });
}

function useTilesPerDay(): string[] | undefined {
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

function getDaysCount(leftmostSelectedTileDate: string | undefined, rightmostSelectedTileDate: string | undefined): number {
  return leftmostSelectedTileDate && rightmostSelectedTileDate ?
    Utils.daysBetweenDates(leftmostSelectedTileDate, rightmostSelectedTileDate) :
    0;
}

function getRows(tilesPerDay: string[] | undefined, leftmostSelectedTileDate: string | undefined, days: number): JSX.Element[] {
  const rows: JSX.Element[] = [];
  if (tilesPerDay) {
    for (let i = 0; i < tilesPerDay.length; i++) {
      const cells = getCells(leftmostSelectedTileDate, days);
      rows.push(<div key={tilesPerDay[i]} className="unassigned-row">{cells}</div>);
    }
  }
  return rows;
}

function getCells(leftmostSelectedTileDate: string | undefined, days: number): JSX.Element[] {
  const cells: JSX.Element[] = [];
  if (leftmostSelectedTileDate) {
    const dateCounter = new Date(leftmostSelectedTileDate);
    for (let i = 0; i < days; i++) {
      const x = Utils.dateToString(dateCounter);
      cells.push(<div key={x} className="unassigned-cell"></div>);
      dateCounter.setDate(dateCounter.getDate() + 1);
    }
  }
  return cells;
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

export default hot(module)(UnassignedTilesPopup);
