import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import "./RoomNumber.css";

function RoomNumber({ number }) {
  return (
    <div className="room-number">
      <span>Room {number}</span>
    </div>
  );
}

RoomNumber.propTypes = {
  number: PropTypes.number.isRequired
};

export default hot(module)(RoomNumber);
