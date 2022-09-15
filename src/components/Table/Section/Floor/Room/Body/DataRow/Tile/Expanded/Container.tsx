import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

type ContainerProps = {
  children: React.ReactNode
};

export default function Container({ children }: ContainerProps): JSX.Element {
  const theme = useTheme();

  return (
    <Box sx={{
      position: "relative",
      borderRadius: "0.75rem",
      backgroundColor: theme.palette.surface.light,
      color: theme.palette.onSurface.light,
      boxShadow: theme.shadows[1],
      pointerEvents: "auto"
    }}>
      {children}
    </Box>
  );
}
