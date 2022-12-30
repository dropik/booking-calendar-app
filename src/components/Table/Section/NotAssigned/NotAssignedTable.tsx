import React, { useEffect, useMemo, useRef } from "react";
import Stack from "@mui/material/Stack";

import * as Utils from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";
import { scrollX } from "../../../../redux/tableSlice";

import Body from "./Body";

export default function NotAssignedTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const leftmostDate = useAppSelector(state => state.table.leftmostDate);
  const columns = useAppSelector(state => state.table.columns);
  const unassignedMap = useAppSelector(state => state.tiles.unassignedMap);
  const allTiles = useAppSelector(state => state.tiles.data);
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);

  const bodyElements = useMemo(() => {
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

    return tiles.map((tile) => (
      <Body key={tile.id} tile={tile} />
    ));
  }, [allTiles, columns, leftmostDate, unassignedMap]);

  function onScroll(event: React.UIEvent<HTMLDivElement>): void {
    const scrollLeft = event.currentTarget?.scrollLeft;
    if (scrollLeft !== undefined && scrollLeft !== null) {
      dispatch(scrollX(scrollLeft));
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(scrollLeft, 0);
    }
  }, [scrollLeft]);

  return (
    <Stack ref={ref} onScroll={onScroll} sx={{
      flexGrow: 1,
      maxWidth: "calc(100% - 7.5rem - 1px)",
      overflowX: "scroll",
    }}>
      {bodyElements}
    </Stack>
  );
}
