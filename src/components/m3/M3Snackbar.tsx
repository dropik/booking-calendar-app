/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";

const M3Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function M3Snackbar({ anchorOrigin, ...props }, ref): JSX.Element {
  return (
    <Snackbar
      {...props}
      ref={ref}
      anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: "bottom", horizontal: "center" }}
      TransitionProps={{

      }}
    />
  );
});

export default M3Snackbar;
