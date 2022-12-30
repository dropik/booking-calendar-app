import React from "react";
import Grid from "@mui/material/Grid";

import { Utils } from "../../../../utils";
import { useColumns, useLeftmostDate } from "../../../../redux/hooks";
import { TileData } from "../../../../redux/tilesSlice";

import FreeSpace from "../Floor/RoomsTable/DataRow/FreeSpace";
import Tile from "../../../Tile";
import GridRow from "../Floor/RoomsTable/GridRow";
import RowBody from "../RowBody";

type RowProps = {
  tile: TileData,
  isFirst: boolean,
  isLast: boolean,
};

export default function Row({ tile, isFirst, isLast }: RowProps): JSX.Element {
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();

  const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
    (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
    <></>;

  return (
    <RowBody isFirst={isFirst} isLast={isLast}>
      <GridRow isFirst={isFirst} isLast={isLast} />
      <Grid container columns={columns} sx={{
        position: "absolute",
        top: -1,
        width: `calc((8rem + 1px) * ${columns})`,
        ...(isFirst && {
          top: "calc(0.25rem - 1px)",
        }),
      }}>
        {freeSpace}
        <Tile data={tile} />
      </Grid>
    </RowBody>
  );
}
