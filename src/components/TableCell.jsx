import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";

import Tile from "./Tile";

import "./TableCell.css";

function TableCell({ tileData, x, y, onTileMove }) {
  var tile =
    tileData !== undefined ? (
      <Tile
        name={tileData.name}
        colour={tileData.colour}
        roomType={tileData.roomType}
        nights={tileData.nights}
        x={x}
        y={y}
        onTileMove={onTileMove}
      />
    ) : (
      ""
    );

  return <div className="table-cell">{tile}</div>;
}

TableCell.propTypes = {
  tileData: PropTypes.exact({
    name: PropTypes.string,
    colour: PropTypes.string,
    roomType: PropTypes.string,
    nights: PropTypes.number,
    roomNumber: PropTypes.number,
    from: PropTypes.string
  }),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onTileMove: PropTypes.func.isRequired
};

export default hot(module)(TableCell);
