import React from "react";
import { useTheme } from "@mui/material/styles";

import { SurfaceTint } from "../m3/Tints";

export default function Tint(): JSX.Element {
  const theme = useTheme();

  return (
    <SurfaceTint sx={{
      backgroundColor: theme.palette.primary.light,
      opacity: theme.opacities.surface1
    }} />
  );
}
