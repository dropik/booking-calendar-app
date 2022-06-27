import React from "react";
import Box from "@mui/material/Box";

import DataRow from "./DataRow";
import GridRow from "./GridRow";


type Props = {
  isLast: boolean,
  roomNumber: number
}

export default function RowBody({ isLast, roomNumber }: Props): JSX.Element {
  return (
    <Box sx={{
      position: "relative",
      ml: "calc(7.5rem + 1px)",
    }}>
      <GridRow isLast={isLast} />
      <DataRow roomNumber={roomNumber} />
    </Box>
  );
}
