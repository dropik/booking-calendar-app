import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon className="button" icon={faBars} onClick={showSidemenu} />
    </div>
  );
}
