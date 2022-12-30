import React from "react";

import * as Utils from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { TileData, unassign } from "../../../../redux/tilesSlice";

import Section from "..";
import Body from "./Body";
import Row from "../Row";
import RowHeader from "../Row/Header";

export default function NotAssigned(): JSX.Element {
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile);
  const dispatch = useAppDispatch();
  const leftmostDate = useAppSelector(state => state.table.leftmostDate);
  const columns = useAppSelector(state => state.table.columns);
  const unassignedMap = useAppSelector(state => state.tiles.unassignedMap);
  const allTiles = useAppSelector(state => state.tiles.data);

  const tiles: TileData[] = [];
  const dateObj = new Date(leftmostDate);
  const visitedTiles: string[] = [];
  for (let i = 0; i < columns; i++) {
    const date = Utils.dateToString(dateObj);
    const unassignedTiles = unassignedMap[date];

    if (unassignedTiles) {
      Object.entries(unassignedTiles).forEach(([tileId]) => {
        if (!visitedTiles.includes(tileId)) {
          tiles.push(allTiles[tileId]);
          visitedTiles.push(tileId);
        }
      });
    }
    dateObj.setDate(dateObj.getDate() + 1);
  }

  function drop(event: React.MouseEvent<HTMLDivElement>): void {
    if (grabbedTile && (event.button === 0)) {
      dispatch(unassign({ tileId: grabbedTile }));
    }
  }

  return (
    <Section onMouseUp={drop} header="Non Assegnati">
      {tiles.map((tile) => (
        <Row key={tile.id}>
          <RowHeader></RowHeader>
          <Body tile={tile} />
        </Row>
      ))}
    </Section>
  );
}
