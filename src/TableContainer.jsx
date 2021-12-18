import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import Table from "./Table";
import "./TableContainer.css";

function TableContainer({ containerRef, hotel, tiles, occupations, onScroll, onTileMove }) {
  return (
    <div
      ref={containerRef}
      className="table-container"
      onScroll={onScroll}
    >
      <Table
        hotel={hotel}
        tiles={tiles}
        occupations={occupations}
        onTileMove={onTileMove}
      />
    </div>
  );
}

TableContainer.propTypes = {
  containerRef: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
  occupations: PropTypes.array.isRequired,
  onScroll: PropTypes.func.isRequired,
  onTileMove: PropTypes.func.isRequired
};

export default hot(module)(TableContainer);
