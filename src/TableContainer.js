import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import GLOBALS from './globals';
import Table from "./Table";
import { remToPx } from './utils';
import "./TableContainer.css";

function TableContainer(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    var columnWidth = remToPx(4) + 1;
    var scrollLeft = columnWidth * GLOBALS.TABLE_PRELOAD_AMOUNT + 1;
    containerRef.current.scrollLeft = scrollLeft;
  }, [props.date, props.columns]);

  return (
    <div ref={containerRef} id="tableContainer" className="table-container">
      <Table
        hotel={props.hotel}
        tiles={props.tiles}
        occupations={props.occupations}
        occupationsDispatch={props.occupationsDispatch}
        onTileMove={props.onTileMove}
        columns={props.columns} 
      />
    </div>
  );
}

export default hot(module)(TableContainer);