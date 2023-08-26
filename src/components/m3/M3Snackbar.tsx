/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Collapse from "@mui/material/Collapse";

const M3Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function M3Snackbar({ anchorOrigin, children, open, sx, ...props }, ref): JSX.Element {
  const theme = useTheme();
  const [enterPaper, setEnterPaper] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setEnterPaper(true), 1);
    } else {
      setEnterPaper(false);
    }
  }, [open]);

  return (
    <Snackbar
      {...props}
      open={open}
      ref={ref}
      anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: "bottom", horizontal: "left" }}
      TransitionComponent={Collapse}
      transitionDuration={theme.transitions.duration.short}
      TransitionProps={{
        easing: {
          enter: theme.transitions.easing.emphasizedDecelerate,
          exit: theme.transitions.easing.emphasizedAccelerate,
        },
      }}
      sx={{
        ".MuiCollapse-root": {
          height: !open ? "auto !important" : undefined,
        },
        ".MuiPaper-root": {
          transition: theme.transitions.create(
            "opacity",
            {
              easing: theme.transitions.easing.emphasized,
              duration: theme.transitions.duration.short,
            }),
          opacity: enterPaper ? 1 : 0,
        },
        ...sx,
      }}
    >
      {children}
    </Snackbar>
  );
});

export default M3Snackbar;
