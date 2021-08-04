import React from 'react';
import { hot } from 'react-hot-loader';
import Table from "./Table";
import "./TableContainer.css";

function TableContainer(props) {
  return (
    <div id="tableContainer" className="table-container">
      <Table  date={props.date}
              hotel={props.hotel}
              tiles={props.tiles}
              occupations={props.occupations}
              occupationsDispatch={props.occupationsDispatch}
              columns={props.columns} />
    </div>
  );
}

export default hot(module)(TableContainer);