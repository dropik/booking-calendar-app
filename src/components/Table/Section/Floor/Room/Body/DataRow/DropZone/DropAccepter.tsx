import React from "react";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../../../../../../../../redux/hooks";
import { move } from "../../../../../../../../redux/tilesSlice";

type DropAccepterProps = {
  children: React.ReactNode,
  roomNumber: string
};

export default function DropAccepter({ children, roomNumber }: DropAccepterProps): JSX.Element {
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
