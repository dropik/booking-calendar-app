/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Card, { CardProps } from "@mui/material/Card";

import { StateLayer, SurfaceTint } from "./Tints";

interface M3CardProps extends CardProps {
  borderRadius?: string
}

const CustomizedCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "borderRadius"
})<M3CardProps>(({ theme, borderRadius }) => ({
  position: "relative",
  borderRadius: borderRadius ? borderRadius : "0.75rem",
  overflow: "visible",
  padding: "1rem",
  backgroundColor: theme.palette.surface.main,
  boxShadow: theme.shadows[1],
  "& > .state-layer": {
    backgroundColor: theme.palette.onSurface.main,
    opacity: 0
  },
  "& > .surface-tint": {
    backgroundColor: theme.palette.primary.main,
    opacity: theme.opacities.surface1
  },
  ":hover": {
    boxShadow: theme.shadows[2],
    "& > .state-layer": {
      opacity: theme.opacities.hover
    },
    "& > .surface-tint": {
      opacity: theme.opacities.surface2
    }
  },
  ":focus-visible": {
    boxShadow: theme.shadows[1],
    "& > .state-layer": {
      opacity: theme.opacities.focus
    },
    "& > .surface-tint": {
      opacity: theme.opacities.surface1
    }
  },
  ":active": {
    boxShadow: theme.shadows[1],
    "& > .state-layer": {
      opacity: theme.opacities.press
    },
    "& > .surface-tint": {
      opacity: theme.opacities.surface1
    }
  }
}));

const M3Card = forwardRef<HTMLDivElement, M3CardProps>(function M3Card({children, ...props }, ref): JSX.Element {
  return (
    <CustomizedCard {...props} ref={ref}>
      <StateLayer />
      {children}
      <SurfaceTint />
    </CustomizedCard>
  );
});

export default M3Card;
