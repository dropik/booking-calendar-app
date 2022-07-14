import React from "react";
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

export default function NotAssignedBody({ tile }: Props): JSX.Element {
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
    (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
    <></>;

  return (
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
  );
}
