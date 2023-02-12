import React from "react";
import { useTheme } from "@mui/material/styles";
import Chip, { ChipProps } from "@mui/material/Chip";

type M3ChipProps = {
  selected: boolean,
} & ChipProps;

export default function M3Chip({ sx, selected, ...props }: M3ChipProps): JSX.Element {
  const theme = useTheme();

  return (
    <Chip {...props} sx={{
      backgroundColor: `${selected ? theme.palette.secondaryContainer.main : theme.palette.surface.main} !important`,
      color: selected ? theme.palette.onSecondaryContainer.main : theme.palette.onSurfaceVariant.main,
      boxShadow: "none !important",
      borderRadius: "0.5rem",
      overflow: "hidden",
      ".MuiChip-label": {
        position: "relative",
        px: "1rem",
        fontSize: theme.typography.labelLarge.fontSize,
        fontWeight: theme.typography.labelLarge.fontWeight,
        letterSpacing: theme.typography.labelLarge.letterSpacing,
      },
      "&::before": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: "' '",
        backgroundColor: theme.palette.onSurfaceVariant.main,
        opacity: 0,
      },
      "&:hover": {
        boxShadow: selected ? `${theme.shadows[1]} !important` : undefined,
        "&::before": {
          opacity: theme.opacities.hover,
        },
      },
      "&:focus-visible::before": {
        opacity: theme.opacities.focus,
      },
      "&:active": {
        boxShadow: selected ? `${theme.shadows[2]} !important` : undefined,
        "&::before": {
          opacity: theme.opacities.press,
        },
      },
      ...sx,
    }} />
  );
}
