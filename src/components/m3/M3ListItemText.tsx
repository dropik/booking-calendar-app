import React from "react";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function M3ListItemText({ children, sx, ...props }: ListItemTextProps): JSX.Element {
  return (
    <ListItemText {...props} sx={{
      color: (theme) => theme.palette.onSurfaceVariant.main,
      ".Mui-selected &": {
        color: (theme) => theme.palette.onSecondaryContainer.main
      },
      ...sx
    }}>
      <Typography variant="labelLarge">
        {children}
      </Typography>
    </ListItemText>
  );
}
