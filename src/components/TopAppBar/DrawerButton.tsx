import React from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch } from "../../redux/hooks";
import * as DrawerSlice from "../../redux/drawerSlice";

import M3IconButton from "../m3/M3IconButton";

export default function DrawerButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  function openDrawer() {
    dispatch(DrawerSlice.toggle());
  }

  return (
    <M3IconButton
      onClick={openDrawer}
      sx={{
        color: theme.palette.onSurface.main
      }}
    >
      <MenuIcon />
    </M3IconButton>
  );
}
