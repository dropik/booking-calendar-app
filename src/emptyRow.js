import React from 'react';
import { hot } from 'react-hot-loader';
import "./emptyRow.css";

function EmptyRow(props) {
  var className ="empty-row";
  if (props.isFollowing) {
    className += " empty-row-following";
  }

  return (
    <div className={className}></div>
  );
}

export default hot(module)(EmptyRow);
