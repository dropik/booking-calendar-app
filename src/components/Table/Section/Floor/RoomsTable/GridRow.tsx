import React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useColumns, useDates } from "../../../../../redux/hooks";

type Props = {
  isFirst: boolean,
  isLast: boolean
}

export default function GridRow({ isFirst, isLast }: Props): JSX.Element {
  const columns = useColumns();
  const theme = useTheme();
  const dates = useDates();

  return (
    <>
      {isFirst ? (
        <Grid container spacing={0} columns={columns} sx={{
          borderBottom: `1px solid ${theme.palette.surfaceVariant.light}`,
          height: "0.25rem",
          width: `calc((8rem + 1px) * ${columns})`,
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
      ) : null}
      <Grid container spacing={0} columns={columns} sx={{
        borderBottom: `1px solid ${theme.palette.surfaceVariant.light}`,
        height: "calc(5.5rem - 1px)",
        width: `calc((8rem + 1px) * ${columns})`,
        ...(isFirst && {
          top: "0.25rem"
        }),
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
      {isLast ? (
        <Grid container spacing={0} columns={columns} sx={{
          height: "0.25rem",
          width: `calc((8rem + 1px) * ${columns})`,
          top: "calc(5.5rem - 1px)",
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
      ) : null}
    </>
  );
}
