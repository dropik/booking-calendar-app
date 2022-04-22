import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface M3TextButtonProps extends ButtonProps {
  iconOnly?: boolean;
}

const CustomizedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "iconOnly"
})<M3TextButtonProps>(({ theme, iconOnly }) => ({
  textTransform: "none",
  height: "2.5rem",
  width: iconOnly ? "2.5rem" : undefined,
  borderRadius: "1.25rem",
  minWidth: iconOnly ? "2.5rem" : "3rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  "& .state-layer": {
    position: "absolute",
    pointerEvents: "none",
    borderRadius: "inherit",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    opacity: 0
  },
  "& .MuiButton-startIcon .MuiSvgIcon-root": {
    fontSize: "1.125rem"
  },
  "& .MuiTypography-root .MuiSvgIcon-root": {
    verticalAlign: "bottom"
  },
  "&:disabled": {
    color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
  },
  "&:hover": {
    backgroundColor: "inherit",
    ".state-layer": {
      opacity: theme.opacities.hover
    }
  },
  "&.focused .state-layer, :focus-visible .state-layer": {
    opacity: theme.opacities.focus
  },
  "&:active .state-layer": {
    opacity: theme.opacities.press
  }
}));

export default function M3TextButton(props: M3TextButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} disableFocusRipple disableTouchRipple>
      <div className="state-layer"></div>
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
