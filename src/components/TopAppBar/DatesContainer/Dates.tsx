import React, { useMemo } from "react";
import Box from "@mui/material/Box";

import { useDates } from "../../../redux/hooks";

import Day from "./Day";

export default function Dates(): JSX.Element {
  const dates = useDates();
  const dayCells = useDayCellsMemo(dates);

  return (
    <Box sx={{
      display: "flex",
      height: "100%",
      ml: "7.5rem"
    }}>
      {dayCells}
    </Box>
  );
}

function useDayCellsMemo(dates: Generator<string, void, void>): JSX.Element[] {
  return useMemo(() => {
    const dayCells: JSX.Element[] = [];
    for (const date of dates) {
      dayCells.push(<Day key={date} x={date} />);
    }
    return dayCells;
  }, [dates]);
}
