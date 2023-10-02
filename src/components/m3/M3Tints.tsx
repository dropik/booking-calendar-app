import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

function M3Tint({ sx, ...props }: BoxProps): JSX.Element {
  return (
    <Box {...props} sx={{
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

export function M3StateLayer(props: BoxProps): JSX.Element {
  return (<M3Tint {...props} className="state-layer" />);
}

export function M3SurfaceTint(props: BoxProps): JSX.Element {
  return (<M3Tint {...props} className="surface-tint" />);
}
