import React from "react";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import Body from "../../Body";

type RoomBodyProps = {
  isLast: boolean,
  roomNumber: number
}

export default function RoomBody({ isLast, roomNumber }: RoomBodyProps): JSX.Element {
  return (
    <Body>
      <GridRow isLast={isLast} />
      <DataRow roomNumber={roomNumber} />
    </Body>
  );
}
