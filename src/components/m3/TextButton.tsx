import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomizedButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "2.5rem",
  borderRadius: "1.25rem",
  minWidth: "3rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  ":disabled": {
    color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
  },
  ":hover .MuiTouchRipple-root": {
    backgroundColor: alpha(theme.palette.onPrimary.main, theme.opacities.hover)
  },
  ":focus-visible .MuiTouchRipple-root": {
    backgroundColor: alpha(theme.palette.onPrimary.main, theme.opacities.focus)
  },
  ":active .MuiTouchRipple-root": {
    backgroundColor: alpha(theme.palette.onPrimary.main, theme.opacities.press)
  }
}));

export default function TextButton(props: ButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} disableFocusRipple disableTouchRipple>
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}