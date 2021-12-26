import React from "react";
import { hot } from "react-hot-loader";

import "./RoomNumber.css";

type Props = {
  number: number,
  isLast: boolean
};

function RoomNumber(props: Props): JSX.Element {
  let className = "room-number";
  if (props.isLast) {
    className += " room-number-last";
  }

  return (
    <div className={className}>
      <span>Room {props.number}</span>
    </div>
  );
}

export default hot(module)(RoomNumber);
