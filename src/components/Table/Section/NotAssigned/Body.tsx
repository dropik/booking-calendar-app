import React from "react";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../utils";
import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import { TileData, unassign } from "../../../../redux/tilesSlice";

import FreeSpace from "../Floor/Room/Body/DataRow/FreeSpace";
import Tile from "../Floor/Room/Body/DataRow/Tile";
import GridRow from "../Floor/Room/Body/GridRow";
import RowBody from "../Row/Body";

type BodyProps = {
  tile: TileData
};

export default function Body({ tile }: BodyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile);

  const freeSpace = (Utils.daysBetweenDates(leftmostDate, tile.from) >= 0) ?
    (<FreeSpace from={Utils.getDateShift(leftmostDate, -1)} to={tile.from} cropLeft={true} cropRight={false} />) :
    <></>;

  function decideDropZone(event: React.DragEvent<HTMLDivElement>): void {
    if (grabbedTile) {
      event.preventDefault();
    }
  }

  return (
    <RowBody
      onDragEnter={decideDropZone}
      onDragOver={decideDropZone}
      onDrop={() => {
        if (grabbedTile) {
          dispatch(unassign({tileId: grabbedTile }));
        }
      }}
    >
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
