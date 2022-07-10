import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../utils";
import { useAppSelector, useColumns, useLeftmostDate } from "../../../redux/hooks";
import { TileData } from "../../../redux/tilesSlice";

import Section from "./Section";
import GridRow from "./Room/RoomBody/GridRow";
import Tile from "./Room/RoomBody/DataRow/Tile";
import FreeSpace from "./Room/RoomBody/DataRow/FreeSpace";

export default function NotAssigned(): JSX.Element {
  const theme = useTheme();
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const tiles = useAppSelector((state) => {
    const result: TileData[] = [];
    const visitedTiles: string[] = [];
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
      {tiles.map((tile) => {
        const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
          (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
          <></>;

        return (
          <Box key={tile.id} sx={{
            position: "relative"
          }}>
            <Box sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              left: 0,
              top: 0,
              bottom: 0,
              width: "5.5rem",
              pr: "1rem",
              pl: "1rem",
              borderRight: `1px solid ${theme.palette.outline.light}`
            }}></Box>
            <Box sx={{
              position: "relative",
              ml: "calc(7.5rem + 1px)",
            }}>
              <GridRow isLast={false} />
              <Grid container columns={columns} sx={{
                position: "absolute",
                top: 0
              }}>
                {freeSpace}
                <Tile data={tile} />
              </Grid>
            </Box>
          </Box>
        );
      })}
    </Section>
  );
}
