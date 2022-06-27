import React from "react";
import Grid from "@mui/material/Grid";

import * as Utils from "../../utils";

export type FreeSpaceProps = {
  from: string,
  to: string,
  cropLeft: boolean,
  cropRight: boolean
};

export default function FreeSpace({ from, to, cropLeft, cropRight }: FreeSpaceProps): JSX.Element {
  const nights = Utils.daysBetweenDates(from, to);
  const size = nights - 0.5 * Number(cropLeft) - 0.5 * Number(cropRight);

  return (
    <Grid item xs={size}></Grid>
  );
}
