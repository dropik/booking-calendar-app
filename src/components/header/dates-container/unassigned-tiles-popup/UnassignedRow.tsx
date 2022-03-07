import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../../redux/hooks";
import * as Utils from "../../../../utils";

import UnassignedCell from "./UnassignedCell";

import "./UnassignedRow.css";

type Props = {
  tileId: string
  leftmostSelectedTileDate: string,
};

function UnassignedRow(props: Props): JSX.Element {
  const rightmostSelectedTileDate = useRightmostSelectedTileDate();

  const days = getDaysCount(props.leftmostSelectedTileDate, rightmostSelectedTileDate);
  const cells = getCells(props, days);

  return (<div className="unassigned-row">{cells}</div>);
}

function useRightmostSelectedTileDate(): string | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      let rightmostSelectedTileDate = selectedDate;
      for (const tileId in state.unassignedTiles.map[selectedDate]) {
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

function getDaysCount(leftmostSelectedTileDate: string, rightmostSelectedTileDate: string | undefined): number {
  return leftmostSelectedTileDate && rightmostSelectedTileDate ?
    Utils.daysBetweenDates(leftmostSelectedTileDate, rightmostSelectedTileDate) :
    0;
}

function getCells(props: Props, days: number): JSX.Element[] {
  const cells: JSX.Element[] = [];
  const dateCounter = new Date(props.leftmostSelectedTileDate);
  for (let i = 0; i < days; i++) {
    const x = Utils.dateToString(dateCounter);
    cells.push(<UnassignedCell key={x} tileId={props.tileId} x={x} />);
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
  return cells;
}

export default hot(module)(UnassignedRow);
