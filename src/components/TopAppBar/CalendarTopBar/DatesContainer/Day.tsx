import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
  x: string
};

export default memo(function Day({ x }: Props): JSX.Element {
  const date = new Date(x);
  const day = date.getDate();
  let dayOfWeek = date.toLocaleDateString("it", { weekday: "short" });
  dayOfWeek = `${dayOfWeek[0].toLocaleUpperCase()}${dayOfWeek.substring(1)}`;

  return (
    <Grid item xs={1} sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="bodySmall">{dayOfWeek}</Typography>
      <Typography variant="labelLarge">{day}</Typography>
    </Grid>
  );
});
