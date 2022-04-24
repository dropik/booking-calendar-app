import React from "react";
import { styled, ThemePalettes } from "@mui/material/styles";
import Fab, { FabProps } from "@mui/material/Fab";

import { StateLayer } from "./Tints";

type ColorCombination = "primary" | "surface" | "secondary" | "tertiary";

type Elevation = "normal" | "lowered" | "none";

type FabTheme = {
  container: ThemePalettes,
  color: ThemePalettes,
  stateLayer: ThemePalettes,
};

type FabThemes = {
  [key in ColorCombination]: FabTheme
};

const fabThemes: FabThemes = {
  primary: {
    container: "primaryContainer",
    color: "onPrimaryContainer",
    stateLayer: "primary"
  },
  surface: {
    container: "surface",
    color: "primary",
    stateLayer: "primary"
  },
  secondary: {
    container: "secondaryContainer",
    color: "onSecondaryContainer",
    stateLayer: "onSecondaryContainer"
  },
  tertiary: {
    container: "tertiary",
    color: "onTertiaryContainer",
    stateLayer: "onTertiaryContainer"
  }
};

interface M3FabProps extends FabProps {
  elevation?: Elevation;
  colorCombination?: ColorCombination;
  dark?: boolean
}

const CustomizedFab = styled(Fab, {
  shouldForwardProp: (prop) => (prop !== "elevation") && (prop !== "colorCombination") && (prop !== "dark")
})<M3FabProps>(({ theme, size, elevation, colorCombination, dark }) => {
  const elevationDef: Elevation = elevation ? elevation : "normal";
  const colorCombinationDef: ColorCombination = colorCombination ? colorCombination : "primary";
  const lighting = dark ? "dark" : "light";
  return ({
    textTransform: "none",
    backgroundColor: `${theme.palette[fabThemes[colorCombinationDef].container][lighting]} !important`,
    color: theme.palette[fabThemes[colorCombinationDef].color][lighting],
    "& .state-layer": {
      backgroundColor: theme.palette[fabThemes[colorCombinationDef].stateLayer][lighting],
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
      <StateLayer />
      {props.children}
    </CustomizedFab>
  );
}
