import React from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch } from "../../redux/hooks";
import * as DrawerSlice from "../../redux/drawerSlice";

import M3TextButton from "../m3/M3TextButton";

export default function DrawerButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  function openDrawer() {
    dispatch(DrawerSlice.toggle());
  }

  return (
    <M3TextButton
      onClick={openDrawer}
      iconOnly
      sx={{
        color: theme.palette.onSurface.main
      }}
    >
      <MenuIcon />
    </M3TextButton>
  );
}
