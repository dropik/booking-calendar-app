import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { Utils } from "../../../utils";
import { TileContext } from "../../Tile/context";

import M3Skeleton from "../../m3/M3Skeleton";

export default function Period(): JSX.Element {
  const { data } = useContext(TileContext);

  const periodStr = data ?
    `${(new Date(data.from)).toLocaleDateString()} - ${(new Date(Utils.getDateShift(data.from, data.nights))).toLocaleDateString()}` :
    undefined;

  return (
    <Typography variant="bodySmall">{periodStr ? periodStr : <M3Skeleton width="8rem" />}</Typography>
  );
}
