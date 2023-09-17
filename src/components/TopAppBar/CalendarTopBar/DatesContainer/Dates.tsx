import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useAppSelector, useDates } from "../../../../redux/hooks";

import Day from "./Day";
import HorizontalScrollWrapper from "../../../Table/HorizontalScrollWrapper";

export default function Dates(): JSX.Element {
  const columns = useAppSelector((state) => state.table.columns);
  const dates = useDates();
  const dayCells = useDayCellsMemo(dates);

  return (
    <Box sx={{
      height: "100%",
      ml: "7.5rem",
      overflow: "hidden",
      width: "calc(100% - 7.5rem + 1px)",
      position: "relative",
    }}>
      <HorizontalScrollWrapper>
        <Grid container spacing={0} columns={columns} sx={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          width: `calc((8rem + 1px) * ${columns})`,
        }}>
          {dayCells}
        </Grid>
      </HorizontalScrollWrapper>
    </Box>
  );
}

function useDayCellsMemo(dates: string[]): JSX.Element[] {
  return useMemo(() => (
    dates.map((date) => (<Day key={date} x={date} />))
  ), [dates]);
}
