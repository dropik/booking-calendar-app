import React from "react";
import { Outlet } from "react-router-dom";
import { api } from "../api";

export default function ApiController(): JSX.Element {
  api.endpoints.getCurrentUser.useQuery(null, { skip: window.location.href.includes("login")});

  return <Outlet />;
}
