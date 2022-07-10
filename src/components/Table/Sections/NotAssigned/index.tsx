import React from "react";

import * as Utils from "../../../../utils";
import { useAppSelector } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";

import Section from "../Section";
import NotAssignedRow from "./NotAssignedRow";

export default function NotAssigned(): JSX.Element {
  const tiles = useAppSelector((state) => {
    const result: TileData[] = [];
    const visitedTiles: string[] = [];
    const leftmostDate = state.table.leftmostDate;
    const columns = state.table.columns;
    let unassignedTiles = state.tiles.unassignedMap[leftmostDate];

    if (unassignedTiles) {
      Object.entries(unassignedTiles).forEach(([tileId]) => {
        result.push(state.tiles.data[tileId]);
        visitedTiles.push(tileId);
      });
    }

    const dateObj = new Date(leftmostDate);

    for (let i = 1; i < columns; i++) {
      dateObj.setDate(dateObj.getDate() + 1);
      const date = Utils.dateToString(dateObj);
      unassignedTiles = state.tiles.unassignedMap[date];

      if (unassignedTiles) {
        Object.entries(unassignedTiles).forEach(([tileId]) => {
          if (!visitedTiles.includes(tileId)) {
            result.push(state.tiles.data[tileId]);
            visitedTiles.push(tileId);
          }
        });
      }
    }

    return result;
  });

  return (
    <Section header="Non Assegnati">
      {tiles.map((tile) => <NotAssignedRow key={tile.id} tile={tile} />)}
    </Section>
  );
}
