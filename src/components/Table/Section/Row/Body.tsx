import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function Body({ children, ...props }: BoxProps): JSX.Element {
  return (
    <Box {...props} sx={{
      position: "relative",
      ml: "calc(7.5rem + 1px)",
    }}>
      {children}
    </Box>
  );
}
