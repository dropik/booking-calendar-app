/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";

import M3TextButton, { M3TextButtonProps } from "./M3TextButton";

const M3IconButton = forwardRef<HTMLButtonElement, M3TextButtonProps>(function M3IconButton({ sx, ...props }, ref): JSX.Element {
  const theme = useTheme();

  return (
    <M3TextButton iconOnly ref={ref} sx={{
      ...sx,
      color: theme.palette.onSurfaceVariant.light
    }} {...props} />
  );
});

export default M3IconButton;
