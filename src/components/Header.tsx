import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import M3AppBar from "./m3/M3AppBar";
import DrawerAdjacent from "./m3/DrawerAdjacent";
import DrawerButton from "./header/DrawerButton";
import DateInput from "./header/DateInput";

import { useAppSelector } from "../redux/hooks";

export default function Header(): JSX.Element {
  const theme = useTheme();
  const open = useAppSelector((state) => state.drawer.open);

  return (
    <M3AppBar>
      <DrawerAdjacent>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: 0,
          transition: theme.transitions.create(["left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            left: "-2.5rem",
            transition: theme.transitions.create(["left"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}>
          <DrawerButton />
          <Typography variant="titleLarge">Booking Calendar</Typography>
        </Box>
        <DateInput />
      </DrawerAdjacent>
    </M3AppBar>
  );
}
