import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import * as Utils from "../../../utils";
import { TileContext } from "../../Tile/context";

export default function Period(): JSX.Element {
  const { data } = useContext(TileContext);

  const formattedFrom = (new Date(data.from)).toLocaleDateString();
  const formattedTo = (new Date(Utils.getDateShift(data.from, data.nights))).toLocaleDateString();
  const periodStr = `${formattedFrom} - ${formattedTo}`;

  return (
    <Typography variant="bodySmall">{periodStr}</Typography>
  );
}
