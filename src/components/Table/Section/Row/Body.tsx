import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function Body({ children, ...props }: BoxProps): JSX.Element {
  return (
    <Box {...props} sx={{
      position: "relative",
      ml: "calc(7.5rem + 1px)",
      overflow: "hidden",
      width: "calc(100% - 7.5rem - 1px)",
      height: "calc(5.5rem - 1px)",
      "& > *": {
        position: "absolute",
        top: 0,
        left: 0,
      },
      ...props.sx,
    }}>
      {children}
    </Box>
  );
}
