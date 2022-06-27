import React from "react";
import Grid from "@mui/material/Grid";

import * as Utils from "../../utils";
import { TileDescriptor } from ".";
import { useAppSelector, useColumns } from "../../redux/hooks";

import FreeSpace, { FreeSpaceProps } from "./FreeSpace";
import Tile from "./Tile";

type Props = {
  roomNumber: number
}

export default function DataRow({ roomNumber }: Props): JSX.Element {
  const columns = useColumns();
  const tiles = useRoomTiles(roomNumber);

  return (
    <Grid container spacing={0} columns={columns} sx={{
      position: "absolute",
      top: 0
    }}>
      {
        tiles.map((tile) => (
          ("id" in tile) ? (
            <Tile key={tile.id} data={tile} />
          ) : (
            <FreeSpace
              key={tile.from}
              from={tile.from}
              to={tile.to}
              cropLeft={tile.cropLeft}
              cropRight={tile.cropRight}
            />
          )
        ))
      }
    </Grid>
  );
}

function useRoomTiles(roomNumber: number): TileDescriptor[] {
  return useAppSelector((state) => {
    const tiles: TileDescriptor[] = [];
    const assignedTilesForRoom = state.tiles.assignedMap[roomNumber];
    const leftmostDate = state.table.leftmostDate;
    const columns = state.table.columns;
    const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

    if (!assignedTilesForRoom) {
      tiles.push({
        from: oneDayBefore,
        to: Utils.getDateShift(leftmostDate, columns),
        cropLeft: true,
        cropRight: true
      });
      return tiles;
    }

    const dateCounterObj = new Date(oneDayBefore);
    let freeSpace: FreeSpaceProps | null = null;

    for (let i = 0; i < columns + 1; i++) {
      const dateCounter = Utils.dateToString(dateCounterObj);
      const assignedTile = assignedTilesForRoom[dateCounter];

      if (!freeSpace) {
        if (assignedTile) {
          const tile = state.tiles.data[assignedTile];
          tiles.push(tile);
          i += tile.nights;
          dateCounterObj.setDate(dateCounterObj.getDate() + tile.nights + 1);
        } else {
          freeSpace = {
            from: dateCounter,
            to: dateCounter,
            cropLeft: false,
            cropRight: false
          };
          if (i === 0) {
            freeSpace.cropLeft = true;
          }
          dateCounterObj.setDate(dateCounterObj.getDate() + 1);
        }
      } else {
        if (assignedTile) {
          freeSpace.to = dateCounter;
          tiles.push(freeSpace);
          freeSpace = null;

          const tile = state.tiles.data[assignedTile];
          tiles.push(tile);
          i += tile.nights - 1;
          dateCounterObj.setDate(dateCounterObj.getDate() + tile.nights);
        } else {
          freeSpace.to = dateCounter;
          dateCounterObj.setDate(dateCounterObj.getDate() + 1);
        }
      }
    }

    if (freeSpace) {
      freeSpace.cropRight = true;
      tiles.push(freeSpace);
    }

    return tiles;
  });
}
