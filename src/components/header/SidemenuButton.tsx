import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./SidemenuButton.css";

function SidemenuButton(): JSX.Element {
  return (
    <div className="sidemenu-button">
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
}

export default hot(module)(SidemenuButton);
