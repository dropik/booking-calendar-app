import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../redux/hooks";
import * as SidemenuSlice from "../../redux/sidemenuSlice";

import "./SidemenuButton.css";

function SidemenuButton(): JSX.Element {
  const dispatch = useAppDispatch();

  function onClick() {
    dispatch(SidemenuSlice.show());
  }

  return (
    <div className="sidemenu-button">
      <FontAwesomeIcon className="button" icon={faBars} onClick={onClick} />
    </div>
  );
}

export default hot(module)(SidemenuButton);
