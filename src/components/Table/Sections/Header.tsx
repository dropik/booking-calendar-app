import React, { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

type HeaderProps = {
  children?: ReactNode
}

export default function Header({ children }: HeaderProps): JSX.Element {
  const theme = useTheme();

  return (
    <Box sx={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      top: 0,
      bottom: 0,
      width: "5.5rem",
      pr: "1rem",
      pl: "1rem",
      borderRight: `1px solid ${theme.palette.outline.light}`
    }}>
      {children}
    </Box>
  );
}
