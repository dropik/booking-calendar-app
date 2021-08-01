import React from 'react';
import { hot } from 'react-hot-loader';
import MonthYear from "./MonthYear";
import Dates from "./Dates";
import "./DatesContainer.css";

function DatesContainer(props) {
  return (
    <div className="dates-container">
      <MonthYear date={props.date} key="monthYear"/>
      <Dates date={props.date} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(DatesContainer);