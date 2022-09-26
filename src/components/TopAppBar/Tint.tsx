import React from "react";
import { useTheme } from "@mui/material/styles";

import { useAppSelector } from "../../redux/hooks";

import { SurfaceTint } from "../m3/Tints";

export default function Tint(): JSX.Element {
  const theme = useTheme();
  const scrollTop = useAppSelector((state) => state.scroll.top);

  return (
    <SurfaceTint sx={{
      top: "-1000px",
      backgroundColor: theme.palette.primary.light,
      transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.fastOutSlowIn}`,
      opacity: 0,
      ...((scrollTop > 0) && {
        opacity: theme.opacities.surface2
      })
    }} />
  );
}
