import React, { useMemo } from "react";

import * as Utils from "../../../../utils";
import { useAppSelector } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";

import Row from "./Row";
import TableWrapper from "../TableWrapper";

export default function NotAssignedTable(): JSX.Element {
  const leftmostDate = useAppSelector(state => state.table.leftmostDate);
  const columns = useAppSelector(state => state.table.columns);
  const unassignedMap = useAppSelector(state => state.tiles.unassignedMap);
  const allTiles = useAppSelector(state => state.tiles.data);

  const rows = useMemo(() => {
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

    return tiles.map((tile, index) => (
      <Row key={tile.id} tile={tile} isFirst={index === 0} isLast={index === tiles.length - 1} />
    ));
  }, [allTiles, columns, leftmostDate, unassignedMap]);

  return (
    <TableWrapper>
      {rows}
    </TableWrapper>
  );
}
