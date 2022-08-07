import React from "react";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import RowBody from "../../../Row/Body";

type BodyProps = {
  isLast: boolean,
  roomNumber: number
}

export default function Body({ isLast, roomNumber }: BodyProps): JSX.Element {
  return (
    <RowBody>
      <GridRow isLast={isLast} />
      <DataRow roomNumber={roomNumber} />
    </RowBody>
  );
}
