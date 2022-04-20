import React from "react";
import { styled, ThemePalettes } from "@mui/material/styles";
import Fab, { FabProps } from "@mui/material/Fab";
import Box from "@mui/material/Box";

type ColourCombination = "primary" | "surface" | "secondary" | "tertiary";

type Elevation = "normal" | "lowered" | "none";

type FabTheme = {
  container: ThemePalettes,
  colour: ThemePalettes,
  stateLayer: ThemePalettes,
};

type FabThemes = {
  [key in ColourCombination]: FabTheme
};

const fabThemes: FabThemes = {
  primary: {
    container: "primaryContainer",
    colour: "onPrimaryContainer",
    stateLayer: "primary"
  },
  surface: {
    container: "surface",
    colour: "primary",
    stateLayer: "primary"
  },
  secondary: {
    container: "secondaryContainer",
    colour: "onSecondaryContainer",
    stateLayer: "onSecondaryContainer"
  },
  tertiary: {
    container: "tertiary",
    colour: "onTertiaryContainer",
    stateLayer: "onTertiaryContainer"
  }
};

interface M3FabProps extends FabProps {
  elevation?: Elevation;
  colourCombination?: ColourCombination;
  dark?: boolean
}

const CustomizedFab = styled(Fab, {
  shouldForwardProp: (prop) => (prop !== "elevation") && (prop !== "colourCombination") && (prop !== "dark")
})<M3FabProps>(({ theme, size, elevation, colourCombination, dark }) => {
  const elevationDef: Elevation = elevation ? elevation : "normal";
  const colourCombinationDef: ColourCombination = colourCombination ? colourCombination : "primary";
  const lighting = dark ? "dark" : "light";
  return ({
    textTransform: "none",
    backgroundColor: `${theme.palette[fabThemes[colourCombinationDef].container][lighting]} !important`,
    color: theme.palette[fabThemes[colourCombinationDef].colour][lighting],
    "& .state-layer": {
      backgroundColor: theme.palette[fabThemes[colourCombinationDef].stateLayer][lighting],
      opacity: 0
    },
    boxShadow: theme.shadows[(
      elevationDef === "normal" ? 3 : (
        elevationDef === "lowered" ? 1 : 0
      )
    )],
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
    marginRight: "1rem",
    marginBottom: "1rem",
    ":hover": {
      boxShadow: theme.shadows[elevationDef === "normal" ? 4 : 2],
      "& .state-layer": {
        opacity: theme.opacities.hover
      }
    },
    ":focus-visible": {
      boxShadow: theme.shadows[(
        elevationDef === "normal" ? 3 : (
          elevationDef === "lowered" ? 1: 0
        )
      )],
      "& .state-layer": {
        opacity: theme.opacities.focus
      }
    },
    ":active": {
      boxShadow: theme.shadows[(
        elevationDef === "normal" ? 3 : (
          elevationDef === "lowered" ? 1: 0
        )
      )],
      "& .state-layer": {
        opacity: theme.opacities.press
      }
    }
  });
});

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
