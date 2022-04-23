import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch } from "../../redux/hooks";
import * as DrawerSlice from "../../redux/sidemenuSlice";

import M3TextButton from "../m3/M3TextButton";

export default function DrawerButton(): JSX.Element {
  const dispatch = useAppDispatch();

  function openDrawer() {
    dispatch(DrawerSlice.show());
  }

  return (
    <M3TextButton
      onClick={openDrawer}
      iconOnly
      sx={{ color: (theme) => theme.palette.onSurface.main, mr: "1rem" }}
    >
      <MenuIcon />
    </M3TextButton>
  );
}
