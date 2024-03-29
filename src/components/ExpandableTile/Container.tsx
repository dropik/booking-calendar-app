import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ExpandableTileContext from "./context";

type ContainerProps = {
  children: React.ReactNode,
  isFirst?: boolean
};

export default function Container({ children, isFirst }: ContainerProps): JSX.Element {
  const { variant } = useContext(ExpandableTileContext);
  const theme = useTheme();

  return (
    <Box sx={{
      position: "relative",
      borderRadius: "0.75rem",
      backgroundColor: theme.palette.surface.light,
      color: variant === "popup" ? theme.palette.onSurface.light : theme.palette.onSurfaceVariant.light,
      boxShadow: theme.shadows[variant === "popup" ? 1 : 0],
      pointerEvents: "auto",
      ...(isFirst === true && {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
      })
    }}>
      {children}
    </Box>
  );
}
