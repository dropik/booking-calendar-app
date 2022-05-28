import React, { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  x: string
};

export default memo(function Day({ x }: Props): JSX.Element {
  const date = new Date(x);
  const day = date.getDate();
  let dayOfWeek = date.toLocaleDateString("default", { weekday: "short" });
  dayOfWeek = `${dayOfWeek[0].toLocaleUpperCase()}${dayOfWeek.substring(1)}`;

  return (
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="bodySmall">{dayOfWeek}</Typography>
      <Typography variant="labelLarge">{day}</Typography>
    </Box>
  );
});
