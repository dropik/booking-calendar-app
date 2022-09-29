import React from "react";
import { useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";

import { SurfaceTint } from "./Tints";

type M3DialogProps = {
  heightRem: number
} & DialogProps;

export default function M3Dialog({ heightRem, children, open, ...props }: M3DialogProps): JSX.Element {
  const theme = useTheme();

  return (
    <Dialog {...props} open={open} keepMounted PaperProps={{
      elevation: 0,
      sx: {
        height: "calc(100vh - 4rem)",
        backgroundColor: "transparent",
        overflow: "visible"
      }
    }}>
      <Paper elevation={3} sx={{
        borderRadius: "1.75rem",
        minWidth: "17.5rem",
        maxWidth: "35rem",
        position: "relative",
        mt: `calc(50vh - ${heightRem / 2 + 2}rem)`
      }}>
        <Collapse
          in={open}
          easing={theme.transitions.easing.fastOutSlowIn}
        >
          {children}
        </Collapse>
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface3
        }} />
      </Paper>
    </Dialog>
  );
}
