import React from "react";
import { useTheme } from "@mui/material/styles";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function M3ListItemText({ children, sx, ...props }: ListItemTextProps): JSX.Element {
  const theme = useTheme();

  return (
    <ListItemText {...props} sx={{
      color: theme.palette.onSurface.main,
      ".MuiDrawer-root &" :{
        color: theme.palette.onSurfaceVariant.main,
        ".Mui-selected &": {
          color: theme.palette.onSecondaryContainer.main
        }
      },
      ...sx
    }}>
      <Typography variant="labelLarge">
        {children}
      </Typography>
    </ListItemText>
  );
}
