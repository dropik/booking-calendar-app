import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../Tile/context";

export default function RoomNumber(): JSX.Element | null {
  const { data } = useContext(TileContext);

  if (data && data.roomNumber) {
    return (
      <Typography variant="bodySmall">{`Camera ${data.roomNumber}`}</Typography>
    );
  }

  return null;
}
