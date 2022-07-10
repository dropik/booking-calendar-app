import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../utils";
import { useColumns, useLeftmostDate } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";

import FreeSpace from "../Room/RoomBody/DataRow/FreeSpace";
import Tile from "../Room/RoomBody/DataRow/Tile";
import GridRow from "../Room/RoomBody/GridRow";

type Props = {
  tile: TileData
};

export default function NotAssignedRow({ tile }: Props): JSX.Element {
  const theme = useTheme();
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
    (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
    <></>;

  return (
    <Box sx={{
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
}
