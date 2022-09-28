import React from "react";
import Grid from "@mui/material/Grid";

import { useColumns, useDates } from "../../../../../../../redux/hooks";

import DateCellSwitch from "./DateCellSwitch";

type DataRowProps = {
  isFirst: boolean,
  roomId: string
}

export default function DataRow({ isFirst, roomId }: DataRowProps): JSX.Element {
  const columns = useColumns();
  const dates = useDates(true);

  return (
    <Grid container spacing={0} columns={columns} sx={{
      position: "absolute",
      top: -1,
      ...(isFirst && {
        top: "calc(0.25rem - 1px)"
      })
    }}>
      {
        dates.map((date) => <DateCellSwitch key={date} roomId={roomId} date={date} />)
      }
    </Grid>
  );
}
