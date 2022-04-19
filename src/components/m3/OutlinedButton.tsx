import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.surface.main,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.outline.main}`,
  boxShadow: theme.shadows[0],
  textTransform: "none",
  height: "2.5rem",
  borderRadius: "1.25rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  "& .MuiButton-startIcon .MuiSvgIcon-root": {
    fontSize: "1.125rem"
  },
  ":disabled": {
    backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.disabledContainer),
    color: alpha(theme.palette.onSurface.main, theme.opacities.disabled)
  },
  ":hover": {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.surface.main,
    "& .MuiTouchRipple-root": {
      backgroundColor: alpha(theme.palette.primary.main, theme.opacities.hover)
    }
  },
  ":focus-visible": {
    boxShadow: theme.shadows[0],
    border: `1px solid ${theme.palette.primary.main}`,
    "& .MuiTouchRipple-root": {
      backgroundColor: alpha(theme.palette.primary.main, theme.opacities.focus)
    }
  },
  ":active": {
    boxShadow: theme.shadows[0],
    border: `1px solid ${theme.palette.outline.main}`,
    "& .MuiTouchRipple-root": {
      backgroundColor: alpha(theme.palette.primary.main, theme.opacities.press)
    }
  }
}));

export default function OutlinedButton(props: ButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} variant="contained" disableTouchRipple disableFocusRipple>
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
