import React from "react";
import { Outlet } from "react-router-dom";
import DrawerButton from "./DrawerButton";
import AppDrawer from "./AppDrawer";

export default function AppRoot(): JSX.Element {
  return (
    <>
      <Outlet />
      <AppDrawer />
      <DrawerButton />
    </>
  );
}
