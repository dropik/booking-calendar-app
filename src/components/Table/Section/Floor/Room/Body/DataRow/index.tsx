import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../../../../utils";
import { useAppDispatch, useAppSelector, useColumns, useDates, useLeftmostDate, useRightmostDate } from "../../../../../../../redux/hooks";
import { TileData, move } from "../../../../../../../redux/tilesSlice";

import FreeSpace from "./FreeSpace";
import Tile from "./Tile";
import { TileContext } from "./Tile/context";
import Size from "./Tile/Size";
import Container from "./Tile/Container";

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
        return <DropZone roomNumber={roomNumber} data={grabbedTile} />;
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
  roomNumber: number,
  data: TileData
};

function DropZone({ roomNumber, data }: DropZoneProps): JSX.Element {
  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false}}>
      <Size>
        <DropAccepter roomNumber={roomNumber}>
          <Container dropZone={true} />
        </DropAccepter>
      </Size>
    </TileContext.Provider>
  );
}

type DropAccepterProps = {
  children: React.ReactNode,
  roomNumber: number
};

function DropAccepter({ children, roomNumber }: DropAccepterProps): JSX.Element {
  const dispatch = useAppDispatch();

  function acceptDrop(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
  }

  function handleDrop(): void {
    dispatch(move({ newY: roomNumber }));
  }

  return (
    <Box
      onDragEnter={acceptDrop}
      onDragOver={acceptDrop}
      onDrop={handleDrop}
    >
      {children}
    </Box>
  );
}
