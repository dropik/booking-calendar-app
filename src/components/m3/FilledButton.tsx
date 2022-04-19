import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.onPrimary.main,
  boxShadow: theme.shadows[0],
  textTransform: "none",
  height: "2.5rem",
  borderRadius: "1.25rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  ":disabled": {
    backgroundColor: alpha(theme.palette.onSurface.main, 0.12),
    color: alpha(theme.palette.onSurface.main, 0.38)
  },
  ":hover": {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.main
  },
  ":focus-visible": {
    boxShadow: theme.shadows[0],
    "& .MuiTouchRipple-root": {
      backgroundColor: theme.palette.onPrimary.main,
      opacity: 0.12
    }
  },
  ":active": {
    boxShadow: theme.shadows[0],
    "& .MuiTouchRipple-root": {
      backgroundColor: theme.palette.onPrimary.main,
      opacity: 0.08
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
