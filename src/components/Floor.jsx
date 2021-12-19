import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";

import "./Floor.css";

function Floor({ isFollowing, name }) {
  var className = "floor";
  if (isFollowing) {
    className += " floor-following";
  }
  name = name[0].toLocaleUpperCase() + name.substr(1, name.length - 1);

  return <div className={className}>{name}</div>;
}

Floor.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default hot(module)(Floor);
