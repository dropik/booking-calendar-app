import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { evaluateEntitiesInString } from "../../../utils";
import { TileContext } from "../../Tile/context";

import M3Skeleton from "../../m3/M3Skeleton";

export default function RoomType(): JSX.Element {
  const { data } = useContext(TileContext);
  const formattedRoomType = data ? `${data.roomType[0].toLocaleUpperCase()}${data.roomType.slice(1)}` : undefined;

  return (
    <Typography variant="bodySmall">{formattedRoomType ? evaluateEntitiesInString(formattedRoomType) : <M3Skeleton width="8rem" />}</Typography>
  );
}
