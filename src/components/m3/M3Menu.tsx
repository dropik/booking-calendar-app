import React from "react";
import { useTheme } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";

import { SurfaceTint } from "./Tints";

export default function M3Menu({ children, PaperProps, ...props }: MenuProps): JSX.Element {
  const theme = useTheme();

  return (
    <Menu
      elevation={2}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.surface.main,
          minWidth: "7rem",
          maxWidth: "17.5rem",
          "& .surface-tint": {
            backgroundColor: theme.palette.surfaceTint.main,
            opacity: theme.opacities.surface2
          },
          ...PaperProps?.sx
        }
      }}
      {...props}
    >
      {children}
      <SurfaceTint />
    </Menu>
  );
}
