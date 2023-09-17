import React from "react";
import { useTheme } from "@mui/material/styles";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import { M3StateLayer } from "./M3Tints";

export default function M3ListItemButton({ sx, children, ...props }: ListItemButtonProps): JSX.Element {
  const theme = useTheme();

  return (
    <ListItemButton {...props}  sx={{
      paddingTop: 0,
      paddingBottom: 0,
      height: "3.5rem",
      borderRadius: "1.75rem",
      backgroundColor: "transparent",
      "& .state-layer": {
        backgroundColor: theme.palette.onSurface.main,
        opacity: 0
      },
      "&:hover": {
        backgroundColor: "transparent",
        "& .state-layer": {
          opacity: theme.opacities.hover
        }
      },
      "&:focus-visible,&.Mui-focusVisible": {
        background: "transparent",
        ".state-layer": {
          opacity: theme.opacities.focus
        }
      },
      "&:active .state-layer": {
        backgroundColor: theme.palette.onSecondaryContainer.main,
        opacity: theme.opacities.press
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.secondaryContainer.main,
        "& .state-layer": {
          backgroundColor: theme.palette.onSecondaryContainer.main
        },
        "&:hover": {
          backgroundColor: theme.palette.secondaryContainer.main
        },
        "&.Mui-focusVisible": {
          backgroundColor: theme.palette.secondaryContainer.main
        }
      },
      ...sx
    }}>
      <M3StateLayer />
      {children}
    </ListItemButton>
  );
}
