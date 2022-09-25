import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useAppSelector, useDates } from "../../../../redux/hooks";

import Day from "./Day";

export default function Dates(): JSX.Element {
  const columns = useAppSelector((state) => state.table.columns);
  const dates = useDates();
  const dayCells = useDayCellsMemo(dates);

  return (
    <Box sx={{
      height: "100%",
      ml: "7.5rem"
    }}>
      <Grid container spacing={0} columns={columns} sx={{
        height: "100%"
      }}>
        {dayCells}
      </Grid>
    </Box>
  );
}

function useDayCellsMemo(dates: string[]): JSX.Element[] {
  return useMemo(() => (
    dates.map((date) => (<Day key={date} x={date} />))
  ), [dates]);
}
