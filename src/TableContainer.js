import React from 'react';
import { hot } from 'react-hot-loader';
import Table from "./Table";
import Hotel from "./Hotel";
import "./TableContainer.css";

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