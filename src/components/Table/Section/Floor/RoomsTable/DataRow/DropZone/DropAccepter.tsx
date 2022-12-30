import React from "react";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../../../../../../../redux/hooks";
import { move } from "../../../../../../../redux/tilesSlice";

type DropAccepterProps = {
  children: React.ReactNode,
  roomId: number
};

export default function DropAccepter({ children, roomId }: DropAccepterProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleDrop(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.button === 0) {
      dispatch(move({ newY: roomId }));
    }
  }

  return (
    <Box onMouseUp={handleDrop}>
      {children}
    </Box>
  );
}
