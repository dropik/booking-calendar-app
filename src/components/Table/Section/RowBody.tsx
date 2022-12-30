import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function RowBody({ children, ...props }: BoxProps): JSX.Element {
  return (
    <Box {...props} sx={{
      position: "relative",
      height: "calc(5.5rem - 1px)",
      ...props.sx,
    }}>
      {children}
    </Box>
  );
}
