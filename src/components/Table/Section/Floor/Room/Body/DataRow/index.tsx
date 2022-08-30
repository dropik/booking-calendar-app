import React from "react";
import Grid from "@mui/material/Grid";

import { useColumns, useDates } from "../../../../../../../redux/hooks";

import DateCellSwitch from "./DateCellSwitch";

type DataRowProps = {
  roomNumber: number
}

export default function DataRow({ roomNumber }: DataRowProps): JSX.Element {
  const columns = useColumns();
  const dates = useDates(true);

  return (
    <Grid container spacing={0} columns={columns} sx={{
      position: "absolute",
      top: 0
    }}>
      {
        dates.map((date) => <DateCellSwitch key={date} roomNumber={roomNumber} date={date} />)
      }
    </Grid>
  );
}
