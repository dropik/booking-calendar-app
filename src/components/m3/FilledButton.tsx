import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.onPrimary.main,
  boxShadow: theme.shadows[0],
  textTransform: "none",
  height: "2.5rem",
  borderRadius: "1.25rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  ":disabled": {
    backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.disabledContainer),
    color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
  },
  ":hover": {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.main
  },
  ":focus-visible": {
    boxShadow: theme.shadows[0],
    "& .MuiTouchRipple-root": {
      backgroundColor: alpha(theme.palette.onPrimary.main, theme.opacities.focus)
    }
  },
  ":active": {
    boxShadow: theme.shadows[0],
    "& .MuiTouchRipple-root": {
      backgroundColor: alpha(theme.palette.onPrimary.main, theme.opacities.hover)
    }
  }
}));

export default function FilledButton(props: ButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} variant="contained" disableTouchRipple disableFocusRipple>
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
