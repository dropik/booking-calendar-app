import React from "react";

import M3AppBar from "../m3/M3AppBar";
import CalendarHeader from "./CalendarHeader";
import DrawerButton from "./DrawerButton";
import Tint from "./Tint";

export default function TopAppBar(): JSX.Element {
  return (
    <M3AppBar sx={{
      position: "sticky",
      pr: "0 !important",
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline"
    }}>
      <DrawerButton />
      <CalendarHeader />
      <Tint />
    </M3AppBar>
  );
}
