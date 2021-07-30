import React from 'react';
import { hot } from 'react-hot-loader';
import Table from "./table";
import "./tableContainer.css";
import Hotel from "./hotel";

function TableContainer(props) {
  return (
    <div className="table-container">
      <Table  date={props.date}
              hotel={props.hotel}
              tiles={props.tiles}
              occupations={props.occupations}
              occupationsDispatch={props.occupationsDispatch}
              columns={props.columns} />

      <Hotel hotel={props.hotel} />
    </div>
  );
}

export default hot(module)(TableContainer);