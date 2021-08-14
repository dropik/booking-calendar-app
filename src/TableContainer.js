import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import globals from './globals';
import Table from "./Table";
import { remToPx } from './utils';
import "./TableContainer.css";

function TableContainer(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    var columnWidth = remToPx(4) + 1;
    var scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
    containerRef.current.scrollLeft = scrollLeft;
  }, [props.date]);

  useEffect(() => {
    containerRef.current.addEventListener('scroll', props.onScroll);
    return () => containerRef.current.removeEventListener('scroll', props.onScroll);
  }, []);

  return (
    <div ref={containerRef} id="tableContainer" className="table-container">
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