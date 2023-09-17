import React from "react";
import { useTheme } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";

import { SurfaceTint } from "./Tints";

export default function M3Menu({ children, PaperProps, TransitionProps, ...props }: MenuProps): JSX.Element {
  const theme = useTheme();

  return (
    <Menu
      {...props}
      elevation={2}
      PaperProps={{
        ...PaperProps,
        sx: {
          backgroundColor: theme.palette.surface.main,
          minWidth: "7rem",
          maxWidth: "17.5rem",
          "& .surface-tint": {
            backgroundColor: theme.palette.surfaceTint.main,
            opacity: theme.opacities.surface2
          },
          ...PaperProps?.sx,
        }
      }}
      TransitionProps={{
        ...TransitionProps,
        mountOnEnter: true,
        unmountOnExit: true
      }}
    >
      {children}
      <SurfaceTint />
    </Menu>
  );
}
