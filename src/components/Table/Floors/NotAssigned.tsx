import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import * as Utils from "../../../utils";
import FloorHeader from "./FloorHeader";
import { useAppSelector, useColumns, useLeftmostDate } from "../../../redux/hooks";
import GridRow from "./Rooms/RoomBody/GridRow";
import Grid from "@mui/material/Grid";
import { TileData } from "../../../redux/tilesSlice";
import FreeSpace from "./Rooms/RoomBody/DataRow/FreeSpace";
import Tile from "./Rooms/RoomBody/DataRow/Tile";
import Collapse from "@mui/material/Collapse";

export default function NotAssigned(): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
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
    <Box sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      <FloorHeader name="Non Assegnati" collapseCallback={() => setOpen(!open)} />
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <Box sx={{
          ...((open && tiles.length > 0) && {
            borderTop: `1px solid ${theme.palette.outline.light}`
          })
        }}>
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
        </Box>
      </Collapse>
    </Box>
  );
}
