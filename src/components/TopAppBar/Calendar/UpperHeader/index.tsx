import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DateInput from "./DateInput";
import UserButton from "./UserButton";

export default function UpperHeader(): JSX.Element {
  return (
    <Grid container columns={3} sx={{
      height: "4rem",
    }}>
      <Grid item xs={1} sx={{
        display: "flex",
        alignItems: "center"
      }}>
        <DateInput />
      </Grid>
      <Grid item xs={1} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Typography variant="titleLarge">
          Booking Calendar
        </Typography>
      </Grid>
      <Grid item xs={1} sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: "1rem",
      }}>
        <UserButton />
      </Grid>
    </Grid>
  );
}
