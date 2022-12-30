import React from "react";
import Box from "@mui/material/Box";

import DataRow from "./DataRow";
import GridRow from "./GridRow";

type RoomProps = {
  isFirst: boolean,
  isLast: boolean,
  roomId: number
}

export default function Room({ isFirst, isLast, roomId }: RoomProps): JSX.Element {
  return (
    <Box sx={{
      position: "relative",
      height: "calc(5.5rem - 1px)",
      ...((isFirst || isLast) && {
        height: "calc(5.75rem - 1px)",
      })
    }}>
      <GridRow isFirst={isFirst} isLast={isLast} />
      <DataRow isFirst={isFirst} roomId={roomId} />
    </Box>
  );
}
