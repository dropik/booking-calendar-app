import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

type RowBodyProps = {
  isFirst: boolean,
  isLast: boolean,
} & BoxProps;

export default function RowBody({ children, sx, isFirst, isLast, ...props }: RowBodyProps): JSX.Element {
  return (
    <Box {...props} sx={{
      ...sx,
      position: "relative",
      height: "calc(5.5rem - 1px)",
      ...((isFirst || isLast) && {
        height: "calc(5.75rem - 1px)",
      }),
      ...((isFirst && isLast) && {
        height: "calc(6rem - 1px)",
      }),
    }}>
      {children}
    </Box>
  );
}
