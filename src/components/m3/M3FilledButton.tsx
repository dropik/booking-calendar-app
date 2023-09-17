import React from "react";
import { alpha, styled, Theme, ThemePalettes } from "@mui/material/styles";
import Button, { ButtonColors, ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { M3StateLayer } from "./M3Tints";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    booking1: true;
    booking2: true;
    booking3: true;
    booking4: true;
    booking5: true;
    booking6: true;
    booking7: true;
    booking8: true;
  }

  type ButtonColors = Exclude<Required<ButtonProps>["color"], "inherit">;
}

export interface M3FilledButtonProps extends ButtonProps {
  container?: boolean;
  iconOnly?: boolean;
}

function getFullColor(theme: Theme, color: ButtonColors | "inherit", container?: boolean): string {
  return checkInherit(color, (color) => `${theme.palette[getColor(color, container)].main} !important`);
}

function getFullOnColor(theme: Theme, color: ButtonColors | "inherit", container?: boolean): string {
  return checkInherit(color, (color) => theme.palette[getOnColor(color, container)].main);
}

function getColor(color: ButtonColors, container?: boolean): ThemePalettes {
  return `${color}${container ? "Container" : ""}`;
}

function getOnColor(color: ButtonColors, container?: boolean): ThemePalettes {
  return `on${color.charAt(0).toUpperCase()}${color.slice(1)}${container ? "Container" : ""}` as ThemePalettes;
}

function checkInherit(color: ButtonColors | "inherit", colorFunc: (color: ButtonColors) => string): string {
  return color === "inherit" ? "inherit" : colorFunc(color);
}

const CustomizedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "container" && prop !== "iconOnly"
})<M3FilledButtonProps>(({ theme, color: undefinedColor, container, iconOnly }) => {
  const color = undefinedColor ? undefinedColor : "primary";
  const backgroundColor = getFullColor(theme, color, container);
  const textColor = getFullOnColor(theme, color, container);
  const stateLayerColor = textColor;

  return ({
    backgroundColor: backgroundColor,
    color: textColor,
    boxShadow: theme.shadows[0],
    textTransform: "none",
    height: "2.5rem",
    width: iconOnly ? "2.5rem" : undefined,
    minWidth: iconOnly ? "2.5rem" : "3rem",
    borderRadius: "1.25rem",
    paddingLeft: iconOnly ? 0 : "1.5rem",
    paddingRight: iconOnly ? 0 : "1.5rem",
    "& .state-layer": {
      backgroundColor: stateLayerColor,
      opacity: 0
    },
    ":disabled": {
      backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.disabledContainer),
      color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
    },
    "&:hover": {
      boxShadow: theme.shadows[1],
      "& .state-layer": {
        opacity: theme.opacities.hover
      }
    },
    "&:focus-visible": {
      boxShadow: theme.shadows[0],
      "& .state-layer": {
        opacity: theme.opacities.focus
      }
    },
    "&:active": {
      boxShadow: theme.shadows[0],
      "& .state-layer": {
        opacity: theme.opacities.hover
      }
    }
  });
});

export default function M3FilledButton(props: M3FilledButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} variant="contained" disableTouchRipple disableFocusRipple>
      <M3StateLayer />
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
