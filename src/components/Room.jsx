import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import TableCell from "./TableCell";

import "./Room.css";

function Room({ y, isFirst }) {
  const columns = useSelector(state => state.main.columns);

  var cells = [];

  for (var i = 0; i < columns; i++) {
    cells.push(
      <TableCell
        key={"x: " + i + "; y: " + y}
        x={i}
        y={y}
      />
    );
  }

  var className = "room";
  if (isFirst) {
    className += " room-first";
  }

  return <div className={className}>{cells}</div>;
}

Room.propTypes = {
  y: PropTypes.number.isRequired,
  isFirst: PropTypes.bool.isRequired
};

export default hot(module)(Room);
