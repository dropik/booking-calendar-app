import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useAppDispatch, useColumns, useDates } from "../../../../../../../redux/hooks";
import { TileData, move } from "../../../../../../../redux/tilesSlice";

import { TileContext } from "./Tile/context";
import Size from "./Tile/Size";
import Container from "./Tile/Container";
import DateCellSwitch from "./DateCellSwitch";

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

type DropZoneProps = {
  roomNumber: number,
  data: TileData
};

export function DropZone({ roomNumber, data }: DropZoneProps): JSX.Element {
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
