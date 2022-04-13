import React from "react";
import { hot } from "react-hot-loader";

import "./RoomNumber.css";

type Props = {
  number: number,
  isLast: boolean
};

function RoomNumber({ number, isLast }: Props): JSX.Element {
  let className = "room-number";
  if (isLast) {
    className += " room-number-last";
  }

  return (
    <div className={className}>
      <span>Camera {number}</span>
    </div>
  );
}

export default hot(module)(RoomNumber);
