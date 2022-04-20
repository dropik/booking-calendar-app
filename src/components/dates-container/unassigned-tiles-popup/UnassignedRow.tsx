import React, { memo, useMemo } from "react";

import { useAppSelector } from "../../../redux/hooks";
import * as Utils from "../../../utils";

import UnassignedCell from "./UnassignedCell";

import "./UnassignedRow.css";

type Props = {
  tileId: string
  leftmostSelectedTileDate: string,
};

export default memo(function UnassignedRow({ tileId, leftmostSelectedTileDate }: Props): JSX.Element {
  const rightmostSelectedTileDate = useRightmostSelectedTileDate();

  const days = getDaysCount(leftmostSelectedTileDate, rightmostSelectedTileDate);
  const cells = useCellsMemo(tileId, leftmostSelectedTileDate, days);

  return (<div className="unassigned-row">{cells}</div>);
});

function useRightmostSelectedTileDate(): string | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.tiles.selectedDate;
    if (selectedDate && state.tiles.unassignedMap[selectedDate]) {
      let rightmostSelectedTileDate = selectedDate;
      for (const tileId in state.tiles.unassignedMap[selectedDate]) {
        const tile = state.tiles.data[tileId];
        const departureDateObj = new Date(tile.from);
        departureDateObj.setDate(departureDateObj.getDate() + tile.nights);
        const departureDate = Utils.dateToString(departureDateObj);
        if (Utils.daysBetweenDates(rightmostSelectedTileDate, departureDate) > 0) {
          rightmostSelectedTileDate = departureDate;
        }
      }
      return rightmostSelectedTileDate;
    }
  });
}

function getDaysCount(leftmostSelectedTileDate: string, rightmostSelectedTileDate: string | undefined): number {
  return leftmostSelectedTileDate && rightmostSelectedTileDate ?
    Utils.daysBetweenDates(leftmostSelectedTileDate, rightmostSelectedTileDate) :
    0;
}

function useCellsMemo(tileId: string, leftmostSelectedTileDate: string, days: number): JSX.Element[] {
  return useMemo(() => {
    const cells: JSX.Element[] = [];
    const dateCounter = new Date(leftmostSelectedTileDate);
    for (let i = 0; i < days; i++) {
      const x = Utils.dateToString(dateCounter);
      cells.push(<UnassignedCell key={x} tileId={tileId} x={x} />);
      dateCounter.setDate(dateCounter.getDate() + 1);
    }
    return cells;
  }, [tileId, leftmostSelectedTileDate, days]);
}
