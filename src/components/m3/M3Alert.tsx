/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import Alert, { AlertProps } from "@mui/material/Alert";

const M3Alert = forwardRef<HTMLDivElement, AlertProps>(function M3Alert({ elevation, ...props }, ref): JSX.Element {
  return (
    <Alert {...props} ref={ref} elevation={elevation ? elevation : 1} />
  );
});

export default M3Alert;
