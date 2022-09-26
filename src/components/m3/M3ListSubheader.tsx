import React from "react";
import ListSubheader, { ListSubheaderProps } from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

export default function M3ListSubheader({ children, sx, ...props }: ListSubheaderProps): JSX.Element {
  return (
    <ListSubheader {...props} sx={{
      color: (theme) => theme.palette.onSurfaceVariant.main,
      ...sx
    }}>
      <Typography variant="titleSmall">
        {children}
      </Typography>
    </ListSubheader>
  );
}
