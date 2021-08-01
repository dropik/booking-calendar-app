import React from 'react';
import { hot } from 'react-hot-loader';
import "./Floor.css";

function Floor(props) {
  var className ="floor";
  if (props.isFollowing) {
    className += " floor-following";
  }
  var name = props.name;
  name = name[0].toLocaleUpperCase() + name.substr(1, name.length - 1);

  return (
    <div className={className}>{name}</div>
  );
}

export default hot(module)(Floor);