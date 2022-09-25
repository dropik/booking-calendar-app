import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggle as toggleDrawer } from "../redux/drawerSlice";
import { adjustColumns } from "../redux/tableSlice";

import M3IconButton from "./m3/M3IconButton";

export default function DrawerButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const open = useAppSelector((state) => state.drawer.open);

  function openDrawer() {
    dispatch(toggleDrawer());
    dispatch(adjustColumns({ drawerOpened: !open }));
  }

  return (
    <Box sx={{
      position: "fixed",
      top: "0.75rem",
      left: "1.25rem",
      zIndex: theme.zIndex.appBar
    }}>
      <M3IconButton
        onClick={openDrawer}
        sx={{
          color: theme.palette.onSurface.main
        }}
      >
        {open ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
      </M3IconButton>
    </Box>
  );
}
