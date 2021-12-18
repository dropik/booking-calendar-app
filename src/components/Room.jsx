import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import TableCell from "./TableCell";

import "./Room.css";

function Room({ roomData, y, isFirst, onTileMove }) {
  const columns = useSelector(state => state.main.columns);

  var cells = [];
  roomData = roomData === undefined ? [] : roomData;

  for (var i = 0; i < columns; i++) {
    cells.push(
      <TableCell
        key={"x: " + i + "; y: " + y}
        tileData={roomData[i]}
        x={i}
        y={y}
        onTileMove={onTileMove}
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
  roomData: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    colour: PropTypes.string,
    roomType: PropTypes.string,
    nights: PropTypes.number,
    roomNumber: PropTypes.number,
    from: PropTypes.string
  })),
  y: PropTypes.number.isRequired,
  isFirst: PropTypes.bool.isRequired,
  onTileMove: PropTypes.func.isRequired
};

export default hot(module)(Room);
