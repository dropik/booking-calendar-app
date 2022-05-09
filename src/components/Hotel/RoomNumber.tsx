import React from "react";

import "./RoomNumber.css";

type Props = {
  number: number,
  isLast: boolean
};

export default function RoomNumber({ number, isLast }: Props): JSX.Element {
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
