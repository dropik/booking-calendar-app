import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import M3AppBar from "./m3/M3AppBar";
import DrawerAdjacent from "./m3/DrawerAdjacent";
import DrawerButton from "./header/DrawerButton";
import DateInput from "./header/DateInput";
import DownloadButton from "./header/DownloadButton";

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
            easing: theme.transitions.easing.fastOutSlowIn,
            duration: theme.transitions.duration.long,
          }),
          ...(open && {
            left: "-3rem",
            transition: theme.transitions.create(["left"], {
              easing: theme.transitions.easing.fastOutSlowIn,
              duration: theme.transitions.duration.long,
            }),
          }),
        }}>
          <DrawerButton />
          <Typography variant="titleLarge">Booking Calendar</Typography>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row"
        }}>
          <DateInput />
          <DownloadButton />
        </Box>
      </DrawerAdjacent>
    </M3AppBar>
  );
}
