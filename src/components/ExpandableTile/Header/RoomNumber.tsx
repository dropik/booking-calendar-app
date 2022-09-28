import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../Tile/context";
import { useAppSelector } from "../../../redux/hooks";

export default function RoomNumber(): JSX.Element | null {
  const { data } = useContext(TileContext);
  const roomNumber = useAppSelector((state) => data && data.roomId ? state.rooms.data[data.roomId].number : undefined);

  if (data && roomNumber) {
    return (
      <Typography variant="bodySmall">{`Camera ${roomNumber}`}</Typography>
    );
  }

  return null;
}
