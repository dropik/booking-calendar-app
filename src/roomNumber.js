import React from 'react';
import { hot } from 'react-hot-loader';
import "./roomNumber.css";

function RoomNumber(props) {
  return (
    <div className="room-number"><span>Room {props.number}</span></div>
  );
}

export default hot(module)(RoomNumber);