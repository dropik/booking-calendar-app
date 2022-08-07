import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../../../../utils";
import { useAppSelector, useColumns, useDates, useLeftmostDate, useRightmostDate } from "../../../../../../../redux/hooks";
import { TileData } from "../../../../../../../redux/tilesSlice";

import FreeSpace from "./FreeSpace";
import Tile from "./Tile";
import { TileContext } from "./Tile/context";
import TileSize from "./Tile/TileSize";
import { SurfaceTint } from "../../../../../../m3/Tints";

type Props = {
  roomNumber: number
}

export default function DataRow({ roomNumber }: Props): JSX.Element {
  const columns = useColumns();
  const dates = useDates(true);

  return (
    <Grid container spacing={0} columns={columns} sx={{
      position: "absolute",
      top: 0
    }}>
      {
        dates.map((date) => <DateCellSwitch key={date} roomNumber={roomNumber} date={date} />)
      }
    </Grid>
  );
}

type DateCellSwitchProps = {
  roomNumber: number,
  date: string
};

function DateCellSwitch({ roomNumber, date }: DateCellSwitchProps): JSX.Element | null {
  const assignedValue = useAppSelector((state) => state.tiles.assignedMap[roomNumber][date]);
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile ? state.tiles.data[state.tiles.grabbedTile] : undefined);
  const assignedTile = useAppSelector((state) => assignedValue ? state.tiles.data[assignedValue] : undefined);
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useRightmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

  if (assignedValue === "dropzone") {
    if (grabbedTile) {
      if ((date === grabbedTile.from) || (date === oneDayBefore)) {
        return <DropZone data={grabbedTile} />;
      }
    }
  } else if (assignedValue !== undefined) {
    if (assignedTile) {
      if ((date === assignedTile.from) || (date === oneDayBefore)) {
        return <Tile data={assignedTile} />;
      }
    }
  } else {
    return (
      <FreeSpace
        from={date}
        to={Utils.getDateShift(date, 1)}
        cropLeft={date === oneDayBefore}
        cropRight={date === rightmostDate}
      />
    );
  }

  return null;
}

type DropZoneProps = {
  data: TileData
};

function DropZone({ data }: DropZoneProps): JSX.Element {
  const theme = useTheme();

  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false}}>
      <TileSize>
        <TileContext.Consumer>
          {
            (value) => (
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "3rem",
                  p: "1rem",
                  borderRadius: "0.75rem",
                  ...(value.cropLeft && {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }),
                  ...(value.cropRight && {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }),
                  border: `1px dashed ${theme.palette.outline.light}`,
                  ...(value.cropRight && {
                    borderRight: 0
                  }),
                  ...(value.cropLeft && {
                    borderLeft: 0
                  })
                }}
              >
                <SurfaceTint sx={{
                  backgroundColor: theme.palette.primary.light,
                  opacity: theme.opacities.surface1
                }} />
              </Box>
            )
          }
        </TileContext.Consumer>
      </TileSize>
    </TileContext.Provider>
  );
}
