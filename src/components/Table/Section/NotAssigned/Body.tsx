import React from "react";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../utils";
import { useColumns, useLeftmostDate } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";

import FreeSpace from "../Floor/Room/Body/DataRow/FreeSpace";
import Tile from "../Floor/Room/Body/DataRow/Tile";
import GridRow from "../Floor/Room/Body/GridRow";
import RowBody from "../Row/Body";

type BodyProps = {
  tile: TileData
};

export default function Body({ tile }: BodyProps): JSX.Element {
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
    (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
    <></>;

  return (
    <RowBody>
      <GridRow isLast={false} />
      <Grid container columns={columns} sx={{
        position: "absolute",
        top: 0
      }}>
        {freeSpace}
        <Tile data={tile} />
      </Grid>
    </RowBody>
  );
}
