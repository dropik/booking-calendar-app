import React from 'react';
import { hot } from 'react-hot-loader';
import Table from "./Table";
import "./TableContainer.css";

function TableContainer(props) {
  return (
    <div ref={props.containerRef} className="table-container" onScroll={props.onScroll}>
      <Table
        hotel={props.hotel}
        tiles={props.tiles}
        occupations={props.occupations}
        onTileMove={props.onTileMove}
        columns={props.columns} 
      />
    </div>
  );
}

export default hot(module)(TableContainer);