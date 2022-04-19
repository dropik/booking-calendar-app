import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch } from "../../redux/hooks";
import * as SidemenuSlice from "../../redux/sidemenuSlice";

import "./SidemenuButton.css";

export default function SidemenuButton(): JSX.Element {
  const dispatch = useAppDispatch();

  function showSidemenu() {
    dispatch(SidemenuSlice.show());
  }

  return (
    <div className="sidemenu-button">
      <MenuIcon className="button" onClick={showSidemenu} />
    </div>
  );
}
