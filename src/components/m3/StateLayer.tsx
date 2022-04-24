import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function StateLayer({ sx, ...props }: BoxProps): JSX.Element {
  return (
    <Box {...props} className="state-layer" sx={{
      position: "absolute",
      pointerEvents: "none",
      borderRadius: "inherit",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...sx
    }} />
  );
}
