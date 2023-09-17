import React from "react";
import { Outlet } from "react-router-dom";
import { api } from "../api";
import DrawerButton from "./DrawerButton";
import AppDrawer from "./AppDrawer";

export default function AppRoot(): JSX.Element {
  api.endpoints.getCurrentUser.useQuery(null);

  return (
    <>
      <DrawerButton />
      <AppDrawer />
      <Outlet />
    </>
  );
}
