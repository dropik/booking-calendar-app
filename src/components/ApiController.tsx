import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchAsync as fetchCurrentUserAsync } from "../redux/userSlice";

export default function ApiController(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  return <Outlet />;
}
