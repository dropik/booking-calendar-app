import React from "react";
import { styled } from "@mui/material/styles";
import Card, { CardProps } from "@mui/material/Card";
import Box from "@mui/material/Box";

interface M3CardProps extends CardProps {
  borderRadius?: string
}

const CustomizedCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "borderRadius"
})<M3CardProps>(({ theme, borderRadius }) => ({
  borderRadius: borderRadius ? borderRadius : "0.75rem",
  overflow: "visible",
  padding: "1rem",
  backgroundColor: theme.palette.surface.main,
  boxShadow: theme.shadows[1],
  "& .surface-tint,.state-layer": {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
    borderRadius: "inherit"
  },
  "& .state-layer": {
    backgroundColor: theme.palette.onSurface.main,
    opacity: 0
  },
  "& .surface-tint": {
    backgroundColor: theme.palette.primary.main,
    opacity: theme.opacities.surface1
  },
  ":hover": {
    boxShadow: theme.shadows[2],
    "& .state-layer": {
      opacity: theme.opacities.hover
    },
    "& .surface-tint": {
      opacity: theme.opacities.surface2
    }
  },
  ":focus-visible": {
    boxShadow: theme.shadows[1],
    "& .state-layer": {
      opacity: theme.opacities.focus
    },
    "& .surface-tint": {
      opacity: theme.opacities.surface1
    }
  },
  ":active": {
    boxShadow: theme.shadows[1],
    "& .state-layer": {
      opacity: theme.opacities.press
    },
    "& .surface-tint": {
      opacity: theme.opacities.surface1
    }
  }
}));

export default function M3Card({children, ...props }: M3CardProps): JSX.Element {
  return (
    <CustomizedCard {...props}>
      <Box className="state-layer"></Box>
      {children}
      <Box className="surface-tint"></Box>
    </CustomizedCard>
  );
}
