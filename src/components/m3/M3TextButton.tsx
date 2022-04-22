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
  "& .MuiButton-startIcon .MuiSvgIcon-root": {
    fontSize: "1.125rem"
  },
  "& .MuiTypography-root .MuiSvgIcon-root": {
    verticalAlign: "bottom"
  },
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

export default function M3TextButton(props: M3TextButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} disableFocusRipple disableTouchRipple>
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
