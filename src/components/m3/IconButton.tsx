import React from "react";
import { alpha, styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const CustomizedButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  lineHeight: theme.typography.labelLarge.lineHeight,
  fontSize: theme.typography.labelLarge.fontSize,
  fontWeight: theme.typography.labelLarge.fontWeight,
  letterSpacing: theme.typography.labelLarge.letterSpacing,
  height: "2.5rem",
  borderRadius: "1.25rem",
  minWidth: "3rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  ":disabled": {
    color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
  },
  ":hover .MuiTouchRipple-root": {
    backgroundColor: theme.palette.primary.main,
    opacity: theme.opacities.hover
  },
  ":focus-visible .MuiTouchRipple-root": {
    backgroundColor: theme.palette.primary.main,
    opacity: theme.opacities.focus
  },
  ":active .MuiTouchRipple-root": {
    backgroundColor: theme.palette.primary.main,
    opacity: theme.opacities.press
  }
}));

export default function M3IconButton(props: IconButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} disableFocusRipple disableTouchRipple>
      {props.children}
    </CustomizedButton>
  );
}
