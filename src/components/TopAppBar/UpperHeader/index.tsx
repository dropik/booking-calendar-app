import React, { Children } from "react";
import Grid from "@mui/material/Grid";

import UserButton from "./UserButton";

type UpperHeaderProps = {
  children?: React.ReactNode,
};

export default function UpperHeader({ children }: UpperHeaderProps): JSX.Element {
  const headerParts: React.ReactNode[] = [null, null];
  Children.forEach(children, (child, index) => {
    // allow only two slots
    if (index < 2) {
      headerParts[index] = child;
    }
  });

  return (
    <Grid container columns={3} sx={{
      height: "4rem",
    }}>
      <Grid item xs={1} sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
        {headerParts[0]}
      </Grid>
      <Grid item xs={1} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {headerParts[1]}
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
