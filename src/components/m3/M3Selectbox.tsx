/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { StateLayer } from "./Tints";
import Select, { SelectProps } from "@mui/material/Select";

export interface M3SelectboxProps extends SelectProps<number> {
  focused?: boolean;
}

const CustomizedSelect = styled(Select<number>)<M3SelectboxProps>(({ theme }) => ({
  textTransform: "none",
  height: "2.5rem",
  borderRadius: "1.25rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  overflow: "hidden",
  "& .MuiSelect-select": {
    height: "100%",
    boxSizing: "border-box",
    padding: 0,
    paddingRight: "1.375rem !important",
    display: "flex",
    alignItems: "center",
    color: theme.palette.onSurface.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
  "& .state-layer": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.125rem",
    color: theme.palette.onSurface.main,
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
  "&.focused .state-layer, :focus-visible .state-layer, &.Mui-focused .state-layer": {
    opacity: theme.opacities.focus
  },
  "&:active .state-layer": {
    opacity: theme.opacities.press
  }
}));

const M3Selectbox = forwardRef<HTMLInputElement, M3SelectboxProps>(function M3Selectbox({ focused, children, ...props }, ref): JSX.Element {
  return (
    <CustomizedSelect
      className={focused ? "focused" : ""}
      ref={ref}
      renderValue={(value) => (
        <>
          <Typography variant="labelLarge">
            {`${value} Giorni`}
          </Typography>
          <StateLayer />
        </>
      )}
      {...props}
    >
      {children}
    </CustomizedSelect>
  );
});

export default M3Selectbox;
