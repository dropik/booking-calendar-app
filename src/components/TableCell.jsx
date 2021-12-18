import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Tile from "./Tile";

import "./TableCell.css";

function TableCell({ x, y }) {
  const tileData = useSelector(state => {
    let occupations = state.main.occupations;
    let occupationsForRoom = occupations[y];
    return occupationsForRoom === undefined ? undefined : occupationsForRoom[x];
  });

  var tile =
    tileData !== undefined ? (
      <Tile
        x={x}
        y={y}
        tileData={tileData}
      />
    ) : (
      ""
    );

  return <div className="table-cell">{tile}</div>;
}

TableCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default hot(module)(TableCell);
