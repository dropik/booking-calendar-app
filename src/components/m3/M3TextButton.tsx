/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { StateLayer } from "./Tints";

interface M3TextButtonProps extends ButtonProps {
  iconOnly?: boolean;
  focused?: boolean;
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
  },
  ".MuiAppBar-root &": {
    color: theme.palette.onSurfaceVariant.main
  }
}));

const M3TextButton = forwardRef<HTMLButtonElement, M3TextButtonProps>(function M3TextButton({ focused, children, ...props }, ref): JSX.Element {
  return (
    <CustomizedButton
      className={focused ? "focused" : ""}
      ref={ref}
      disableFocusRipple
      disableTouchRipple
      {...props}
    >
      <StateLayer />
      <Typography variant="labelLarge">
        {children}
      </Typography>
    </CustomizedButton>
  );
});

export default M3TextButton;
