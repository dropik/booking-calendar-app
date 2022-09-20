import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../context";

export default function RoomType(): JSX.Element {
  const { data } = useContext(TileContext);
  const formattedRoomType = `${data.entity[0].toLocaleUpperCase()}${data.entity.slice(1)}`;

  return (
    <Typography variant="bodySmall">{formattedRoomType}</Typography>
  );
}
