import React from "react";
import { styled } from "@mui/material/styles";
import Fab, { FabProps } from "@mui/material/Fab";
import Box from "@mui/material/Box";

interface M3FabProps extends FabProps {
  lowered?: boolean,
  colourCombination?: "primary" | "surface" | "secondary" | "tertiary"
}

const CustomizedFab = styled(Fab)<M3FabProps>(({ theme, size, lowered, colourCombination = "primary" }) => ({
  textTransform: "none",
  backgroundColor: `${(
    colourCombination === "surface" ? theme.palette.surface.main : (
      colourCombination === "secondary" ? theme.palette.secondaryContainer.main : (
        colourCombination === "tertiary" ? theme.palette.tertiary.main : theme.palette.primaryContainer.main
      )
    )
  )} !important`,
  color: (
    colourCombination === "surface" ? theme.palette.primary.main : (
      colourCombination === "secondary" ? theme.palette.onSecondaryContainer.main : (
        colourCombination === "tertiary" ? theme.palette.onTertiaryContainer.main : theme.palette.onPrimaryContainer.main
      )
    )
  ),
  "& .state-layer": {
    backgroundColor: (
      colourCombination === "surface" ? theme.palette.primary.main : (
        colourCombination === "secondary" ? theme.palette.onSecondaryContainer.main : (
          colourCombination === "tertiary" ? theme.palette.onTertiaryContainer.main : theme.palette.primary.main
        )
      )
    ),
    opacity: 0
  },
  boxShadow: theme.shadows[lowered ? 1 : 3],
  height: (
    size === "small" ? "2.5rem" : (
      size === "large" ? "6rem" : "3.5rem"
    )
  ),
  width: (
    size === "small" ? "2.5rem" : (
      size === "large" ? "6rem" : "3.5rem"
    )
  ),
  borderRadius: (
    size === "small" ? "0.75rem" : (
      size === "large" ? "1.75rem" : "1rem"
    )
  ),
  fontSize: (
    size === "small" ? "1.5rem" : (
      size === "large" ? "2.25rem" : "1.5rem"
    )
  ),
  margin: "1rem",
  ":hover": {
    boxShadow: theme.shadows[lowered ? 2 : 4],
    "& .state-layer": {
      opacity: theme.opacities.hover
    }
  },
  ":focus-visible": {
    boxShadow: theme.shadows[lowered ? 1 : 3],
    "& .state-layer": {
      opacity: theme.opacities.focus
    }
  },
  ":active": {
    boxShadow: theme.shadows[lowered ? 1 : 3],
    "& .state-layer": {
      opacity: theme.opacities.press
    }
  }
}));

export default function M3Fab(props: M3FabProps): JSX.Element {
  return (
    <CustomizedFab {...props} disableFocusRipple>
      <Box className="state-layer" sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        pointerEvents: "none",
        borderRadius: "inherit"
      }}></Box>
      {props.children}
    </CustomizedFab>
  );
}
