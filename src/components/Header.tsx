import React from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../redux/hooks";
import * as SidemenuSlice from "../redux/sidemenuSlice";

import M3AppBar from "./m3/M3AppBar";
import M3TextButton from "./m3/M3TextButton";
import DateInput from "./header/DateInput";

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  function showSidemenu() {
    dispatch(SidemenuSlice.show());
  }

  return (
    <M3AppBar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <M3TextButton
          onClick={showSidemenu}
          iconOnly
          sx={{ color: (theme) => theme.palette.onSurface.main, mr: "1rem" }}
        >
          <MenuIcon />
        </M3TextButton>
        <Typography variant="titleLarge">Booking Calendar</Typography>
      </Box>
      <DateInput />
    </M3AppBar>
  );
}
