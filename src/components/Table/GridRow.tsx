import React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useDates } from "../../redux/hooks";

type Props = {
  isLast: boolean
}

export default function GridRow({ isLast }: Props): JSX.Element {
  const theme = useTheme();
  const dates = useDates();

  return (
    <Grid container spacing={0} columns={7} sx={{
      borderBottom: `1px solid ${theme.palette.surfaceVariant.light}`,
      height: "calc(5rem + 5px)",
      ...(isLast && {
        borderBottom: 0,
        height: "calc(5rem + 4px)"
      })
    }}>
      {dates.map((date, dateIndex) => (
        <Grid key={date} item xs={1} sx={{
          borderRight: `1px solid ${theme.palette.surfaceVariant.light}`,
          ...((dateIndex === dates.length - 1) && {
            borderRight: 0
          })
        }}></Grid>
      ))}
    </Grid>
  );
}
