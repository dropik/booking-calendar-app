import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { useAppSelector } from "../../redux/hooks";

export default function DrawerAdjacent({ children, sx, ...props }: BoxProps): JSX.Element {
  const open = useAppSelector((state) => state.drawer.open);
  const theme = useTheme();

  return (
    <Box sx={{
      display: "inherit",
      flexDirection: "inherit",
      alignItems: "inherit",
      justifyContent: "inherit",
      overflow: "hidden",
      //width: "100%",
      transition: theme.transitions.create(["margin"], {
        easing: theme.transitions.easing.fastOutSlowIn,
        duration: theme.transitions.duration.long,
      }),
      ...(open && {
        marginLeft: theme.drawerWidth,
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.fastOutSlowIn,
          duration: theme.transitions.duration.long,
        }),
      }),
      ...sx
    }} {...props}>
      {children}
    </Box>
  );
}
