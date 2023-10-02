import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";

import ExpandableTileContext from "./context";
import { M3SurfaceTint } from "../m3/M3Tints";

export default function Tint(): JSX.Element {
  const { variant } = useContext(ExpandableTileContext);
  const theme = useTheme();

  return (
    <M3SurfaceTint sx={{
      backgroundColor: theme.palette.primary.light,
      opacity: variant === "popup" ? theme.opacities.surface1 : theme.opacities.surface2
    }} />
  );
}
