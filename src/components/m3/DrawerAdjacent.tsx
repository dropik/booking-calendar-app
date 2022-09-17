import React from "react";
import { useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as LayoutSlice from "../../redux/layoutSlice";

export default function DrawerAdjacent({ children, sx, ...props }: BoxProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);

  function addAdjustRequest() {
    dispatch(LayoutSlice.addAdjustRequest());
  }

  return (
    <Box
      onTransitionEnd={addAdjustRequest}
      sx={{
        ...sx,
        display: "inherit",
        flexDirection: "inherit",
        alignItems: "inherit",
        justifyContent: "inherit",
        overflow: "hidden",
        ml: "5rem",
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.fastOutSlowIn,
          duration: theme.transitions.duration.long,
        }),
        ...(open && {
          marginLeft: theme.drawerWidth
        })
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
