import React from "react";

import M3AppBar from "../m3/M3AppBar";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import Tint from "./Tint";
import Stack from "@mui/material/Stack";

type TopAppBarProps = {
  children: React.ReactNode
};

export default function TopAppBar({ children }: TopAppBarProps): JSX.Element {
  return (
    <M3AppBar sx={{
      position: "sticky",
      pr: "0 !important",
      display: "flex",
      flexDirection: "row"
    }}>
      <DrawerAdjacent sx={{ width: "100%" }}>
        <Stack sx={{ width: "100%" }}>
          {children}
        </Stack>
      </DrawerAdjacent>
      <Tint />
    </M3AppBar>
  );
}
