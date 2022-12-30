import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

type HeaderProps = {
  isFirst: boolean,
  isLast: boolean,
} & BoxProps

export default function Header({ children, sx, isFirst, isLast }: HeaderProps): JSX.Element {
  return (
    <Box sx={{
      ...sx,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      top: 0,
      bottom: 0,
      width: "5.5rem",
      height: "calc(5.5rem - 1px)",
      pr: "1rem",
      pl: "1rem",
      ...((isFirst || isLast) && {
        height: "calc(5.75rem - 1px)",
      }),
    }}>
      {children}
    </Box>
  );
}
